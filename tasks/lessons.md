# 📚 LECCIONES APRENDIDAS - SPARK

Este archivo documenta todos los errores, soluciones y reglas aprendidas durante el desarrollo de Spark.

**Propósito:** No repetir los mismos errores.

---

## Semana 1

### [2026-03-24] Error: "Module not found" al instalar paquetes nuevos

**Problema:**
Al instalar un paquete nuevo (ej: `zod`) en el worktree y correr
`npm run dev` desde el repo principal, Next.js no encontraba el módulo.

**Causa raíz:**
El worktree y el repo principal son directorios físicos separados en el disco.
Cada uno tiene su propio `node_modules`. Git comparte commits y branches,
pero nunca los `node_modules` (están en `.gitignore`). Al hacer `git merge`,
el `package.json` actualizado llega al repo principal pero los módulos
no se instalan solos.

**Solución:**
Correr `npm run dev` siempre desde el worktree, no desde el repo principal:
```bash
cd "C:\Users\david\OneDrive\Escritorio\New project - SPARK\.claude\worktrees\vigorous-dubinsky"
npm run dev
```

**Regla nueva:**
El worktree es el directorio de desarrollo activo. Todo (`npm run dev`,
pruebas manuales, verificar que funciona) se hace desde ahí.
El repo principal se usa solo como destino del `git merge` + `git push`.

---

## Template para nuevas lecciones

```markdown
### [YYYY-MM-DD] Error: [Título descriptivo]

**Problema:**
[Descripción clara del problema]

**Causa raíz:**
[Por qué ocurrió realmente]

**Solución:**
[Cómo se arregló]

**Regla nueva:**
[Qué hacer siempre de ahora en adelante]

---
```

---

*Actualizado: Inicio del proyecto*
