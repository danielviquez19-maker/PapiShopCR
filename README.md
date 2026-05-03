# Papishopcr.com — Sitio multipágina v6

Versión ajustada con:

- Logo oficial final aplicado en header, footer, favicon e íconos PWA.
- Cards principales finales de categoría aplicadas en páginas Perros y Gatos.
- Assets WebP optimizados para ecommerce.
- Estructura responsive para desktop, tablet y móvil.

## Archivos principales

- `index.html`
- `perros.html`
- `gatos.html`
- `visto-en-tiktok.html`
- `favoritos.html`
- `carrito.html`
- `styles.css`
- `script.js`
- `site.webmanifest`

## Carpeta de assets actualizada

- `assets/brand/logos/`
- `assets/brand/icons/`
- `assets/brand/category-cards/`
- `assets/products/`

## v7 - Ajuste hero categorías
- Corrección de espacio vacío superior en páginas Perros y Gatos.
- Se forzó `min-width:0` en el grid del hero para que las imágenes cuadradas no expandan la fila.
- Se limitó el ancho visual de los category cards y se agregó cache busting a CSS/JS (`?v=7`).


- v11: ajuste de tipografías para Amplify. Se reforzó la carga de Google Fonts en todos los HTML, se actualizó cache busting a `?v=11` y se agregó `customHttp.yml` con permisos CSP para `fonts.googleapis.com` y `fonts.gstatic.com`.
- v11: se conserva la integración del GIF original real en el hero de perros si el archivo fue recibido dentro de `download.gif.zip`.
