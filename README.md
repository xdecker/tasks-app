# Tasks App — Coderland Challenge

Aplicacion movil desarrollada con React Native (Expo) como parte de una prueba tecnica. 
Gestion de tareas locales y visualizacion de datos desde una API remota.

## Stack tecnologico

- **Framework**: Expo v54 + React Native 0.81
- **Navegacion**: Expo Router con sistema de rutas basado en archivos
- **Estado**: Zustand con persistencia en AsyncStorage (los datos de tareas se mantienen al cerrar y volver a abrir la app)
- **UI**: React Native Paper con Material Design 3
- **Tests**: Jest + React Native Testing Library v14
- **Lenguaje**: TypeScript

## Requisitos

- Node.js >= 18
- Expo CLI (`npx expo`)
- Dispositivo o emulador Android/iOS, o navegador web

## Instalacion y ejecucion

```bash
npm install
npx expo start
```

Una vez iniciado, puedes escanear el QR con Expo Go, o presionar `a` para emulador Android, `i` para iOS, `w` para web.

## Tests

```bash
npm test          # todos los tests
npx jest --watch  # modo watch
npx jest app/tasks/index.test.tsx   # solo tests de Tasks
npx jest app/listado/index.test.tsx # solo tests de Listado
```

20 tests, 3 suites. Sin snapshots.

### Cobertura

| Archivo | Tests | Que cubre |
|---------|-------|-----------|
| `store/use-task-store.test.ts` | 6 | add, remove, duplicados, estado vacio |
| `app/tasks/index.test.tsx` | 8 | lista vacia, listar tareas, crear, validacion, eliminar, seleccion multiple, bulk delete |
| `app/listado/index.test.tsx` | 6 | loading, fetch exitoso, formato fecha UTC, error, lista vacia |

### Notas sobre RNTL v14

- `render()` es `async` — siempre usar `await render(<Componente />)`
- El matcher `toBeOnScreen` ahora se llama `toBeOnTheScreen` (con S mayuscula)
- Items agregados a un FlatList despues del render inicial pueden necesitar `findByText` en vez de `getByText`

## Estructura del proyecto

```
app/
  _layout.tsx          Layout raiz con Stack navigator y PaperProvider
  index.tsx            Pantalla principal con acceso a Tasks y Listado
  tasks/index.tsx      Pantalla de gestion de tareas
  listado/index.tsx    Pantalla con listado desde API remota
store/
  use-task-store.ts    Store de Zustand con persistencia local
theme/
  index.ts             Tema personalizado MD3 con modo claro y oscuro
```

## Funcionalidades

### Tasks
- Las tareas se guardan en AsyncStorage mediante Zustand persist, asi que si cierras la app y vuelves a entrar, las tareas siguen ahi.
- Modal con formulario para crear una nueva tarea, con validacion que impide enviar si el campo esta vacio.
- Modo de seleccion multiple: desde el toolbar puedes entrar en modo seleccion, marcar varias tareas con checkboxes, seleccionar todas, deseleccionar todas, y eliminarlas en grupo.
- Snackbar de confirmacion al crear una tarea, con boton para cerrar manualmente.

### Listado
- Al entrar a la pantalla se hace una peticion GET a mockapi.io/elements.
- Mientras carga la informacion se muestra un spinner con texto "Cargando elementos...".
- Si la peticion falla y no hay datos guardados, se muestra un mensaje de error. Si ya hay datos y la recarga falla, aparece un snackbar rojo con el error sin perder lo que ya estaba visible.
- Cada elemento muestra un avatar, nombre y fecha de creacion formateada en UTC (yyyy-MM-dd HH:mm).
- Si la imagen del avatar no carga por cualquier motivo, se muestra un icono por defecto en su lugar.
- Pull-to-refresh para recargar los datos manualmente.

### Temas claro y oscuro
- La aplicacion se adapta automaticamente al tema del sistema operativo (claro u oscuro).
- Los colores de la interfaz cambian completamente para adaptarse al modo activo, usando una paleta de azul indigo para el modo claro y tonos slate para el modo oscuro.
- React Native Paper maneja la mayoria de los componentes con soporte nativo de MD3 para ambos temas.

### UX en general
- La pantalla principal tiene dos tarjetas con iconos que llevan a cada seccion.
- Cuando no hay tareas, se muestra un estado vacio con indicaciones de que hacer.
- El toolbar de seleccion multiple aparece sobre la lista con un fondo ligeramente distinto para diferenciarse de los items.
- Los snackbars usan el color del texto para indicar exito (verde) o error (rojo), manteniendo el fondo por defecto.
