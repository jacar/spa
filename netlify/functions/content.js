import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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

export const handler = async (event, context) => {
  const { httpMethod, body } = event;

  // GET /api/content
  if (httpMethod === 'GET') {
    try {
      const docRef = doc(db, "config", "site_content");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          statusCode: 200,
          headers: { 
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
          },
          body: JSON.stringify(docSnap.data()),
        };
      }
      return {
          statusCode: 404,
          body: JSON.stringify({ error: 'No content found in Firebase' }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }

  // POST /api/content
  if (httpMethod === 'POST') {
    try {
      const newContent = JSON.parse(body);
      const docRef = doc(db, "config", "site_content");
      await setDoc(docRef, newContent);

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Contenido actualizado en Firebase via Netlify' }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }

  return {
    statusCode: 405,
    body: 'Method Not Allowed',
  };
};
