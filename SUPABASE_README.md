# Supabase Setup Guide

## 🚀 Paso a Paso para Configurar Supabase

### 1. Crear Proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com/)
2. Sign up con GitHub
3. Crea un nuevo proyecto
4. Copia tu **Project URL** y **anon key**

### 2. Configurar las Tablas de Base de Datos
1. En Supabase Dashboard, ve a **SQL Editor**
2. Crea una nueva query
3. Copia TODO el contenido de `SUPABASE_SETUP.sql`
4. Ejecuta la query
5. ✅ Listo! Se crearán todas las tablas automáticamente

### 3. Configurar credenciales (ENV)
No guardes claves en el código. El proyecto ahora lee las credenciales desde variables de entorno (Vite):

```
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_....
```

Pasos:
1. Crea un archivo `.env` en la raíz (no lo commits). Usa `.env.example` como plantilla.
2. Para Vercel: en tu proyecto → Settings → Environment Variables, añade `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` (setea para `Production`).
3. Reinicia el deploy si es necesario.

El archivo `services/supabaseClient.ts` usa `import.meta.env.VITE_SUPABASE_URL` y `import.meta.env.VITE_SUPABASE_ANON_KEY`.

### 4. Estructura de Base de Datos

#### `user_profiles` - Perfiles de Usuarios
- `id` (UUID) - ID del usuario
- `user_type` (TEXT) - 'viajero' o 'propietario'
- `full_name` (TEXT) - Nombre completo
- `avatar_url` (TEXT) - URL del avatar
- `created_at` / `updated_at` (TIMESTAMP)

#### `properties` - Propiedades/Alojamientos
- `id` (UUID) - ID único
- `owner_id` (UUID) - ID del propietario
- `title` (TEXT) - Nombre de la propiedad
- `description` (TEXT) - Descripción
- `country` (TEXT) - País
- `price` (DECIMAL) - Precio por noche
- `bedrooms`, `bathrooms` (INTEGER)
- `images` (ARRAY) - URLs de imágenes
- `amenities` (ARRAY) - Servicios
- `rating` (DECIMAL) - Calificación
- `status` (TEXT) - 'active', 'inactive', 'archived'

#### `bookings` - Reservas
- `id` (UUID) - ID único
- `property_id` (UUID) - ID de propiedad
- `guest_id` (UUID) - ID del huésped
- `check_in` / `check_out` (DATE) - Fechas
- `total_price` (DECIMAL)
- `status` (TEXT) - 'pending', 'confirmed', 'cancelled', 'completed'

#### `reviews` - Reseñas
- `id` (UUID) - ID único
- `property_id` (UUID) - ID de propiedad
- `guest_id` (UUID) - ID del huésped
- `rating` (INTEGER) - 1-5 estrellas
- `comment` (TEXT) - Comentario

### 5. Funciones Disponibles

En `services/supabaseClient.ts` están pre-configuradas:

**Autenticación:**
- `signUp(email, password, userType)` - Crear cuenta
- `signIn(email, password)` - Iniciar sesión
- `signOut()` - Cerrar sesión
- `getCurrentUser()` - Obtener usuario actual

**Propiedades:**
- `createProperty(property)` - Crear propiedad
- `getProperties(filters)` - Obtener propiedades (con filtros)
- `getUserProperties(userId)` - Obtener propiedades del usuario
- `updateProperty(id, updates)` - Actualizar propiedad
- `deleteProperty(id)` - Eliminar propiedad

### 6. Usar en Componentes

```tsx
import { signIn, getProperties } from '../services/supabaseClient';

// Iniciar sesión
const result = await signIn('usuario@email.com', 'password');
if (result.success) {
  const user = result.data.user;
}

// Obtener propiedades con filtro
const result = await getProperties({
  country: 'Argentina',
  minPrice: 100,
  maxPrice: 500
});
```

### 7. Row Level Security (RLS)

Todas las tablas tienen RLS habilitado para seguridad:
- Los usuarios solo ven sus propios datos
- Los propietarios solo pueden editar sus propiedades
- Los huéspedes solo pueden ver propiedades activas
- Todo está protegido automáticamente

### 8. Próximos Pasos

✅ Ejecuta el SQL de setup en Supabase
✅ Login.tsx ya está configurado para usar autenticación real
✅ El app guardará propiedades en la BD en lugar de localStorage
✅ Las reservas se guardarán con autenticación

**¿Dudas?** Revisa la [documentación de Supabase](https://supabase.com/docs)
