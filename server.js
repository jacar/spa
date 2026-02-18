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

console.log('Ruta de datos:', DATA_FILE);

// Leer contenido
app.get('/api/content', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
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

app.listen(PORT, () => {
    console.log(`Backend del CMS corriendo en http://localhost:${PORT}`);
});
