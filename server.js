import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
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

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu-LYKX8UA4e3qK1pSFwKubJJAvbI15RY",
  authDomain: "radioweb-36625.firebaseapp.com",
  projectId: "radioweb-36625",
  storageBucket: "radioweb-36625.firebasestorage.app",
  messagingSenderId: "698367844815",
  appId: "1:698367844815:web:0779c110ff1551043372ba"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Ensure data directory exists (local dev)
try {
    await fs.mkdir(DATA_DIR, { recursive: true });
} catch (err) {
    // Ignore error in read-only environments
}

// Read content (Firestore with local fallback)
app.get('/api/content', async (req, res) => {
    try {
        const docRef = doc(db, "config", "site_content");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            return res.json(docSnap.data());
        }
        throw new Error('No content in Firestore');
    } catch (error) {
        console.log('Using local fallback for content:', error.message);
        try {
            const data = await fs.readFile(DATA_FILE, 'utf-8');
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            res.json(JSON.parse(data));
        } catch (localErr) {
            res.status(500).json({ error: 'Error al leer el contenido' });
        }
    }
});

// Save content (Firestore and local fallback)
app.post('/api/content', async (req, res) => {
    const newContent = req.body;
    try {
        // Try local save (will fail on Vercel, which is fine)
        try {
            await fs.writeFile(DATA_FILE, JSON.stringify(newContent, null, 2));
        } catch (fsError) {
            console.warn('Local save failed (expected on Vercel)');
        }

        // Save to Firestore
        const docRef = doc(db, "config", "site_content");
        await setDoc(docRef, newContent);

        res.json({ message: 'Contenido actualizado en Firebase' });
    } catch (error) {
        console.error('Error guardando contenido:', error);
        res.status(500).json({ error: 'Error al guardar el contenido' });
    }
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

export default app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor con Firebase corriendo en http://localhost:${PORT}`);
    });
}
