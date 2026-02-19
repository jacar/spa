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
const supabase = createClient(supabaseUrl, supabaseKey);

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

// Leer contenido (de Supabase)
app.get('/api/content', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('app_config')
            .select('value')
            .eq('key', 'site_content')
            .single();

        if (error) throw error;

        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.json(data ? data.value : {});
    } catch (error) {
        console.error('Error Supabase:', error);
        // Fallback local si falla Supabase (opcional)
        try {
            const data = await fs.readFile(DATA_FILE, 'utf-8');
            res.json(JSON.parse(data));
        } catch (localErr) {
            res.status(500).json({ error: 'Error al leer el contenido' });
        }
    }
});

// Guardar contenido (en Supabase)
app.post('/api/content', async (req, res) => {
    try {
        const newContent = req.body;
        const { error } = await supabase
            .from('app_config')
            .upsert({ key: 'site_content', value: newContent }, { onConflict: 'key' });

        if (error) throw error;

        // También actualizamos localmente para tener backup
        await fs.writeFile(DATA_FILE, JSON.stringify(newContent, null, 2));

        res.json({ message: 'Contenido actualizado correctamente en Supabase' });
    } catch (error) {
        console.error('Error guardando en Supabase:', error);
        res.status(500).json({ error: 'Error al guardar el contenido en la base de datos' });
    }
});

// Ruta catch-all para React (SPA)
app.get('*', (req, res) => {
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
