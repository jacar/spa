import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Cargar variables de entorno locales
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERROR: No se encontraron las credenciales de Supabase en .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function sync() {
  console.log('🔄 Iniciando sincronización de contenido local -> Supabase...');

  try {
    // 1. Leer el archivo local con la imagen correcta
    const dataPath = path.join(__dirname, '../data/content.json');
    const content = JSON.parse(await fs.readFile(dataPath, 'utf-8'));
    console.log('✅ Archivo content.json leído correctamente.');

    // 2. Subir a Supabase
    const { error } = await supabase
      .from('app_config')
      .upsert({ key: 'site_content', value: content }, { onConflict: 'key' });

    if (error) {
      console.error('❌ Error al subir a Supabase:', error.message);
    } else {
      console.log('🚀 ¡Sincronización Exitosa! Tu web en producción ahora tiene la imagen correcta.');
      console.log('💡 RECUERDA: Si usas Vercel/Netlify, asegúrate de que tus Environment Variables coincidan.');
    }
  } catch (err) {
    console.error('❌ Error fatal durante la sincronización:', err.message);
  }
}

sync();
