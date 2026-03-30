# Divine Aesthetics Spa 🌿✨

![Divine Aesthetics Spa](https://www.webcincodev.com/blog/wp-content/uploads/2026/02/Gemini_Generated_Image_83n1ft83n1ft83n1-1-scaled.png)

Una SPA (Single Page Application) premium diseñada para **Yésica Serrano**, enfocada en ofrecer una experiencia estética de clase mundial con un diseño editorial, limpio y sofisticado.

## ✨ Características Destacadas

- **Diseño Editorial Premium**: Tipografías seleccionadas ('Playfair Display' y 'Plus Jakarta Sans') y paleta de colores cohesiva.
- **ServiceBar Dinámico**: Franja de beneficios destacados con iconos animados y fondo púrpura de alta gama.
- **Bilingüe (ES/EN)**: Soporte completo para español e inglés en todas las secciones.
- **Fácil Gestión (CMS)**: Integración con un panel de administración para actualizar servicios, testimonios y más.
- **Optimizado para Móviles**: Visibilidad mejorada de imágenes críticas y respuesta fluida en todos los dispositivos.

## 🛠️ Stack Tecnológico

- **Frontend**: React.js con Vite y TypeScript.
- **Estilos**: Tailwind CSS para un diseño ultra-responsivo.
- **Iconografía**: Lucide React.
- **Backend**: Express.js (servidor CMS unificado).
- **Base de Datos**: Supabase (con fallback local automático para desarrollo).

## 🚀 Instalación y Uso Local

### Prerrequisitos
- Node.js (versión 18 o superior recomendada).

### Pasos
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/jacar/spa.git
   cd spa
   ```
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Configurar variables de entorno (Opcional):**
   Crea un archivo `.env.local` con las claves de Supabase si deseas sincronizar con la nube:
   - `VITE_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   *El sistema usará `data/content.json` como respaldo si no se configuran estas claves.*

4. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev:all
   ```
   La aplicación estará disponible en `http://localhost:3000`.

---
*Desarrollado con ❤️ para Divine Aesthetics Spa.*
