import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3005;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'content.json');

// Supabase Init
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

if (!supabaseUrl || !supabaseKey) {
    console.warn('WARNING: Missing Supabase credentials. Continuing with local fallback mode.');
} else {
    try {
        supabase = createClient(supabaseUrl, supabaseKey);
        console.log('Supabase initialized with URL:', supabaseUrl);
    } catch (err) {
        console.error('Error initializing Supabase client:', err);
    }
}

// Keep-alive ping para Supabase (Solo si está inicializado)
if (supabase) {
    setInterval(async () => {
        try {
            await supabase.from('app_config').select('id').limit(1);
            console.log(`[Keep-Alive] Ping a Supabase exitoso a las ${new Date().toISOString()}`);
        } catch (err) {
            console.error('[Keep-Alive] Error al hacer ping a Supabase:', err.message);
        }
    }, 10 * 60 * 1000); // 10 minutos
}

// Asegurar que el directorio existe

try {
    await fs.mkdir(DATA_DIR, { recursive: true });
} catch (err) {
    console.error('Error creando directorio de datos:', err);
}

app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend (dist)
app.use(express.static(path.join(__dirname, 'dist')));

console.log('Ruta de datos:', DATA_FILE);

// Leer contenido (Preferentemente de Supabase, fallback local)
app.get('/api/content', async (req, res) => {
    try {
        if (supabase) {
            const { data, error } = await supabase
                .from('app_config')
                .select('value')
                .eq('key', 'site_content')
                .single();

            if (error) throw error;
            return res.json(data ? data.value : {});
        }
        throw new Error('Supabase not initialized');
    } catch (error) {
        console.log('Using local fallback for content...');
        try {
            const data = await fs.readFile(DATA_FILE, 'utf-8');
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
            res.json(JSON.parse(data));
        } catch (localErr) {
            res.status(500).json({ error: 'Error al leer el contenido local' });
        }
    }
});

// Guardar contenido (en Supabase y localmente)
app.post('/api/content', async (req, res) => {
    const newContent = req.body;
    try {
        // En Vercel el file system es read-only, así que envolvemos esto en try/catch
        try {
            await fs.writeFile(DATA_FILE, JSON.stringify(newContent, null, 2));
        } catch (fsError) {
            console.warn('No se pudo escribir localmente (Normal en Vercel):', fsError.message);
        }

        if (supabase) {
            const { error } = await supabase
                .from('app_config')
                .upsert({ key: 'site_content', value: newContent }, { onConflict: 'key' });

            if (error) throw error;
            return res.json({ message: 'Contenido actualizado en Supabase y localmente' });
        }
        
        res.json({ message: 'Contenido actualizado localmente (Modo Desarrollo)' });
    } catch (error) {
        console.error('Error guardando contenido:', error);
        res.status(500).json({ error: 'Error al guardar el contenido' });
    }
});

// Ruta catch-all para React (SPA)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Vercel Serverless Function Config
export default app;

// Local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor unificado corriendo en http://localhost:${PORT}`);
    });
}
