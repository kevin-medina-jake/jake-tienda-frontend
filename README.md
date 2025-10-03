# Jake Tienda - Frontend

![Logo de la tienda](public/favicon.svg)

Bienvenido al repositorio del frontend de Jake Tienda, una moderna tienda en línea desarrollada con Next.js 15, React 19 y TypeScript.

## 🚀 Características

- **Tecnologías Modernas**: Next.js 15, React 19, TypeScript y Tailwind CSS
- **Diseño Responsive**: Adaptable a todos los dispositivos
- **Rendimiento Optimizado**: Carga rápida gracias a la generación estática
- **Carrito de Compras**: Gestión de productos y precios en tiempo real


## 🛠️ Estructura del Proyecto

```
jake-tienda-frontend/
├── public/           # Archivos estáticos (imágenes, íconos, etc.)
├── src/
│   ├── app/          # Rutas y páginas de Next.js
│   ├── assets/       # Recursos como imágenes y fuentes
│   ├── components/   # Componentes reutilizables
│   ├── config/       # Configuraciones de la aplicación
│   ├── data/         # Datos estáticos y mocks
│   ├── lib/          # Utilidades y helpers
│   ├── styles/       # Estilos globales y módulos CSS
│   └── types/        # Definiciones de TypeScript
├── scripts/          # Scripts de utilidad
├── .eslintrc.js      # Configuración de ESLint
├── next.config.js    # Configuración de Next.js
├── package.json      # Dependencias y scripts
└── tsconfig.json     # Configuración de TypeScript
```

## 🚀 Empezando

### Requisitos Previos

- Node.js 18.0 o superior
- npm, yarn, pnpm o bun
- Git

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/igrisdev/jake-tienda-frontend.git
   cd jake-tienda-frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   # o
   bun install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

   ```
   SITE_NAME='Shopify Store Name'
   SHOPIFY_REVALIDATION_SECRET='Random Secret'
   SHOPIFY_STOREFRONT_ACCESS_TOKEN='shopify storefront access token'
   SHOPIFY_STORE_DOMAIN='shopify admin store domain'
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   # o
   bun dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## 🛠️ Comandos Útiles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia la aplicación en producción

## 📦 Dependencias Principales

- **Next.js 15** - Framework de React para aplicaciones web
- **React 19** - Biblioteca para construir interfaces de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework CSS utilitario
- **Framer Motion** - Animaciones fluidas
- **Swiper** - Carrusel táctil
- **Zod** - Validación de esquemas

## 🌐 Despliegue

La forma más fácil de desplegar tu aplicación Next.js es usar Vercel, la plataforma de los creadores de Next.js.

## 📺 Vídeo Tutorial

Gracias a este video tutorial, puedes terminar de construir una tienda online con Next.js, Shopify y TypeScript.

[ Building Next.js Ecommerce Store with TypeScript, Tailwindcss, headlessui, and Shopify CMS. ](https://www.youtube.com/watch?v=fJxzVFXGT_E&t=19992s)
