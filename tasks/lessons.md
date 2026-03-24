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

### [2026-03-24] Error: "Cannot find module ./948.js" / caché corrupta

**Problema:**
Next.js muestra error de módulo no encontrado o `PageNotFoundError: /_document`
después de agregar archivos nuevos o cambiar rutas.

**Causa raíz:**
La carpeta `.next` guarda chunks compilados con nombres hash. Cuando cambia
la estructura de archivos, los hashes viejos quedan en caché y ya no existen.

**Solución:**
```bash
rm -rf .next
npm run dev   # o npm run build
```

**Regla nueva:**
Ante cualquier error de módulo no encontrado en Next.js, lo primero es
borrar `.next` y reiniciar. Si persiste, entonces investigar el código.

---

### [2026-03-24] Bug: router.push no refresca datos del servidor

**Problema:**
Después de guardar una idea y hacer `router.push("/ideas")`, el inbox
mostraba la versión cacheada (vacía) en lugar de las ideas nuevas.

**Causa raíz:**
`router.push` en Next.js App Router usa el caché del cliente y no
re-ejecuta los Server Components. Sirve la página guardada en memoria.

**Solución:**
Usar `window.location.href = "/ideas"` en lugar de `router.push`.
Fuerza una carga completa desde el servidor, siempre con datos frescos.

**Regla nueva:**
Después de mutaciones (crear/editar/borrar), usar `window.location.href`
o `window.location.reload()` para garantizar datos frescos del servidor.

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
