# Frontend-Tingeso (ToolRent)

Una interfaz web para la gestión de préstamo de herramientas (ToolRent). Esta aplicación forma parte de la entrega del proyecto de Tingeso y provee un dashboard, gestión de clientes, herramientas, préstamos y kardex, con autenticación Keycloak y visualizaciones basadas en MUI (Material UI).

---

## Contenido
- [Características](#características)
- [Tecnologías y versiones](#tecnologías-y-versiones)
- [Instalación (Windows)](#instalación-windows)
- [Scripts útiles](#scripts-útiles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Créditos](#créditos)
- [Licencia](#licencia)

---

## Características
- Dashboard global y por rango de fechas con gráficos interactivos.
- Gestión de clientes: crear, editar, listar y estado.
- Gestión de herramientas: agregar, editar, agrupar y desactivar.
- Préstamos: crear préstamos, devolver y ver historial (kardex).
- Autenticación y autorización mediante Keycloak.
- Visualizaciones con componentes `@mui/x-charts` y tablas con `@mui/x-data-grid`.

---

## Tecnologías y versiones
Las dependencias principales y versiones utilizadas en este proyecto (extraídas de `package.json`):

- Node / npm: (versión recomendada) Node 18+ / npm 9+
- Vite: ^7.1.2
- React: ^19.1.1
- @mui/material: ^7.3.2
- @mui/icons-material: ^7.3.2
- @mui/x-charts: ^8.14.0
- @mui/x-data-grid: ^8.11.0
- @mui/x-date-pickers: ^8.11.1
- @mui/lab: ^7.0.1-beta.18
- @emotion/react / styled: ^11.14.x
- react-router-dom: ^7.8.2
- axios: ^1.11.0
- dayjs: ^1.11.18
- formik: ^2.4.6
- yup: ^1.7.0
- Keycloak: keycloak-js ^26.2.0 (integración con `@react-keycloak/web` ^3.4.0)

Dependencias de desarrollo:
- eslint, @eslint/js: ^9.33.0
- @types/react / @types/react-dom
- @vitejs/plugin-react

Si necesitas versiones fijas para producción, considera crear un `engines` en `package.json` o usar un `.nvmrc`.

---

## Instalación (Windows)
1. Clona el repositorio o descarga el código.
2. Abre una terminal (cmd.exe) en la carpeta del proyecto.
3. Instala dependencias:

```cmd
npm install
```

4. Ejecuta en modo desarrollo:

```cmd
npm run dev
```

La aplicación quedará disponible en `http://localhost:5173` (por defecto de Vite).

---

## Scripts útiles
- `npm run dev` — inicia Vite en modo desarrollo.
- `npm run build` — build de producción.
- `npm run preview` — sirve la build localmente para probar.
- `npm run lint` — corre ESLint sobre el proyecto.

---

## Estructura del proyecto

`/src` — código fuente principal
- `main.jsx` — entrypoint de React
- `App.jsx` — navegación y rutas
- `http-common.js` — configuración de axios
- `theme.js` — tema MUI
- `assets/` — imágenes y recursos estáticos
- `Components/` — componentes React organizados por dominio
  - `Clients/`, `Tools/`, `Loan/`, `Kardex/`, `Data/`, `General/`, `Format/`, `Other/`
- `services/` — servicios para llamadas HTTP (client.service.js, tool.service.js, loan.service.js, etc.)

`/public` — archivos estáticos (favicon, imágenes públicas)

`vite.config.js` — configuración de Vite

---

## Créditos
Proyecto realizado para la asignatura de Tingeso.

---

## Licencia
Este repositorio incluye `LICENSE.md`. Revisa ese archivo para más detalles.
