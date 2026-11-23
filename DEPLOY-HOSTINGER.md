# Configuración y Despliegue de Perla & Pluma en Hostinger (hPanel · Node.js)

Esta guía detalla la configuración requerida en **Hostinger hPanel** y la integración del **servidor oficial Hostinger MCP** en el editor, garantizando que **nunca se incluyan secretos ni contraseñas en el código fuente**.

---

## 1. Servidor Hostinger MCP en el Editor

El editor cuenta con el servidor oficial remoto de Hostinger registrado en su configuración MCP (`mcp_config.json`):

```json
{
  "mcpServers": {
    "hostinger": {
      "url": "https://mcp.hostinger.com"
    }
  }
}
```

### Cómo autorizar la conexión con tu cuenta de Hostinger:
* **Método 1 (OAuth 2.1 automático):** Al iniciar la conexión, el editor abrirá una ventana en tu navegador para que inicies sesión en Hostinger y apruebes el acceso a tu cuenta de forma segura.
* **Método 2 (Token de API personal):**
  1. En tu **hPanel**, ve a la esquina superior derecha (tu perfil de usuario) &gt; **Seguridad** &gt; **Tokens de API** (o **Administrador de API**).
  2. Pulsa en **Generar nuevo token** con permisos sobre **Hosting, Dominios y Despliegues**.
  3. Establece la variable de entorno en tu sistema local (nunca en archivos de código):
     ```bash
     $env:HOSTINGER_API_TOKEN="tu_token_aqui"
     ```

---

## 2. Lo que necesitas configurar en hPanel

Entra en tu panel de control de Hostinger (**hPanel**) &gt; **Sitios web** &gt; Selecciona tu dominio/subdominio (`perlaypluma.laperladeeli.es` o `laperladeeli.es`).

### A. Sección «Node.js»
En el menú lateral de hPanel, ve a **Node.js** (o **Aplicación Node.js**) y verifica los siguientes parámetros:

| Parámetro | Valor recomendado | Explicación |
| :--- | :--- | :--- |
| **Versión de Node.js** | `20.x` o `22.x` | Versión LTS compatible con Next.js 15. |
| **Directorio raíz de la app** | `public_html` | Directorio donde residen `package.json` y la carpeta `src`. |
| **Modo de aplicación** | `Production` | Garantiza rendimiento y optimizaciones en vivo. |
| **Comando de compilación (Build)** | `npm run build` | Compila las páginas estáticas y rutas de Next.js. |
| **Comando de inicio (Start)** | `npm run start` | Arranca el servidor web en el puerto asignado. |

---

### B. Variables de Entorno en hPanel (Sin contraseñas en el código)
En la misma sección de Node.js (pestaña **Variables de Entorno** o **Environment Variables**), añade las variables que necesita tu tienda:

| Nombre de Variable | Valor | Propósito |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Indica a Next.js que ejecute en modo producción. |
| `NEXT_PUBLIC_SITE_URL` | `https://perlaypluma.laperladeeli.es` | Dominio canónico para enlaces y metadatos. |
| `AW_DROPSHIP_API_TOKEN` | *(Tu Bearer Token de AW Dropship)* | Transmisión automática de pedidos al proveedor. |

> [!IMPORTANT]
> **Seguridad**: Las variables se configuran exclusivamente en este apartado privado de hPanel. Nunca se suben archivos `.env` con credenciales al servidor ni al repositorio.

---

### C. Estructura en el «Administrador de Archivos»
Al subir o actualizar los archivos de la tienda:
1. Asegúrate de estar dentro de la carpeta raíz de tu aplicación (`public_html`).
2. Los archivos y carpetas clave deben estar directamente en ese nivel:
   ```text
   public_html/
   ├── package.json
   ├── next.config.ts
   ├── tsconfig.json
   ├── src/
   │   ├── app/
   │   ├── components/
   │   └── data/
   └── public/
       └── images/
   ```
3. **Evita anidar subcarpetas**: Al descomprimir un ZIP en Hostinger, especifica `.` (un punto) como destino para que no se cree una carpeta dentro de otra.

---

### D. Certificado de Seguridad (SSL) y Dominio
1. En hPanel, ve a **Seguridad** &gt; **SSL**.
2. Verifica que el certificado de **Let's Encrypt** figure como **Activo** para `perlaypluma.laperladeeli.es`.
3. Activa la casilla **«Forzar HTTPS»** para redirigir automáticamente cualquier visita no segura a la conexión cifrada.
