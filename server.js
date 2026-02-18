import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3005;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'content.json');

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

// Leer contenido
app.get('/api/content', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Error al leer el contenido' });
    }
});

// Guardar contenido
app.post('/api/content', async (req, res) => {
    try {
        const newContent = req.body;
        await fs.writeFile(DATA_FILE, JSON.stringify(newContent, null, 2));
        res.json({ message: 'Contenido actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar el contenido' });
    }
});

// Ruta catch-all para React (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor unificado corriendo en http://localhost:${PORT}`);
});
