-- ============================================
-- SCHEMA DE BASE DE DATOS - SPARK
-- ============================================
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- Orden: ejecutar TODO este archivo de una vez.
-- ============================================


-- ============================================
-- TABLA: ideas
-- Almacena las ideas capturadas por el usuario.
-- ============================================

CREATE TABLE IF NOT EXISTS ideas (
  -- UUID generado automáticamente por PostgreSQL.
  -- Es el identificador único de cada idea.
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Referencia al usuario de Supabase Auth.
  -- ON DELETE CASCADE: si el usuario se borra, sus ideas también.
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- El texto de la idea. NOT NULL porque una idea sin contenido no existe.
  content TEXT NOT NULL,

  -- Estado simplificado (decisión arquitectónica en decisions.md):
  -- 'active'   → idea viva, el usuario la está desarrollando
  -- 'archived' → idea descartada o completada
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),

  -- Timestamps automáticos
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice para acelerar las queries más comunes:
-- "Dame todas las ideas activas del usuario X"
CREATE INDEX IF NOT EXISTS ideas_user_id_status_idx
  ON ideas (user_id, status);


-- ============================================
-- TABLA: prompts
-- Prompts generados para cada idea.
-- Un idea puede tener 3-5 prompts.
-- ============================================

CREATE TABLE IF NOT EXISTS prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Referencia a la idea padre.
  -- ON DELETE CASCADE: si se borra la idea, sus prompts también.
  idea_id UUID NOT NULL REFERENCES ideas(id) ON DELETE CASCADE,

  -- Título corto del prompt (ej: "Analiza la competencia")
  title TEXT NOT NULL,

  -- El prompt completo listo para copiar y pegar en ChatGPT/Claude
  content TEXT NOT NULL,

  -- La respuesta que el usuario pega de vuelta desde su IA.
  -- NULL mientras no ha sido respondido.
  answer TEXT,

  -- Orden de presentación (1, 2, 3...)
  -- El usuario ve los prompts en este orden.
  order_index INTEGER NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice para queries "Dame todos los prompts de la idea X"
CREATE INDEX IF NOT EXISTS prompts_idea_id_idx
  ON prompts (idea_id, order_index);


-- ============================================
-- FUNCIÓN: actualizar updated_at automáticamente
-- ============================================
-- En lugar de actualizar updated_at manualmente en
-- cada UPDATE, creamos un trigger que lo hace solo.

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para la tabla ideas
CREATE OR REPLACE TRIGGER ideas_updated_at
  BEFORE UPDATE ON ideas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger para la tabla prompts
CREATE OR REPLACE TRIGGER prompts_updated_at
  BEFORE UPDATE ON prompts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- RLS garantiza que cada usuario SOLO puede ver
-- y modificar SUS PROPIOS datos. Es seguridad
-- a nivel de base de datos, no solo en el código.
--
-- Sin RLS: cualquier usuario autenticado podría
-- leer las ideas de otros usuarios.
-- Con RLS: Supabase bloquea esas queries automáticamente.

-- Activar RLS en ambas tablas
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;


-- ============================================
-- POLICIES para tabla: ideas
-- ============================================

-- SELECT: solo ver tus propias ideas
CREATE POLICY "ideas: select own"
  ON ideas FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: solo crear ideas para ti mismo
CREATE POLICY "ideas: insert own"
  ON ideas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: solo modificar tus propias ideas
CREATE POLICY "ideas: update own"
  ON ideas FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: solo borrar tus propias ideas
CREATE POLICY "ideas: delete own"
  ON ideas FOR DELETE
  USING (auth.uid() = user_id);


-- ============================================
-- POLICIES para tabla: prompts
-- ============================================
-- Los prompts no tienen user_id directo.
-- Los protegemos vía la idea padre: si puedes
-- ver la idea, puedes ver sus prompts.

-- SELECT: ver prompts de tus ideas
CREATE POLICY "prompts: select via idea"
  ON prompts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM ideas
      WHERE ideas.id = prompts.idea_id
        AND ideas.user_id = auth.uid()
    )
  );

-- INSERT: crear prompts en tus ideas
CREATE POLICY "prompts: insert via idea"
  ON prompts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM ideas
      WHERE ideas.id = prompts.idea_id
        AND ideas.user_id = auth.uid()
    )
  );

-- UPDATE: modificar prompts de tus ideas
CREATE POLICY "prompts: update via idea"
  ON prompts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM ideas
      WHERE ideas.id = prompts.idea_id
        AND ideas.user_id = auth.uid()
    )
  );

-- DELETE: borrar prompts de tus ideas
CREATE POLICY "prompts: delete via idea"
  ON prompts FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM ideas
      WHERE ideas.id = prompts.idea_id
        AND ideas.user_id = auth.uid()
    )
  );


-- ============================================
-- VERIFICACIÓN FINAL
-- ============================================
-- Después de ejecutar, verifica con estas queries:

-- Ver tablas creadas:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Ver policies activas:
-- SELECT tablename, policyname FROM pg_policies WHERE schemaname = 'public';
