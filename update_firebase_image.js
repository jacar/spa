import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAu-LYKX8UA4e3qK1pSFwKubJJAvbI15RY",
  authDomain: "radioweb-36625.firebaseapp.com",
  projectId: "radioweb-36625",
  storageBucket: "radioweb-36625.firebasestorage.app",
  messagingSenderId: "698367844815",
  appId: "1:698367844815:web:0779c110ff1551043372ba"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updateImage() {
  try {
    const docRef = doc(db, "config", "site_content");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.services) {
        data.services = data.services.map(s => {
          if (s.id === "rejuvenation") {
            s.image = "https://www.webcincodev.com/blog/wp-content/uploads/2026/03/pies-4.png";
          }
          return s;
        });
        await setDoc(docRef, data);
        console.log("Firebase updated successfully for Facial Rejuvenation!");
      }
    } else {
      console.log("Document does not exist in Firebase yet.");
    }
  } catch (e) {
    console.error("Error updating Firebase:", e);
  }
}

updateImage();
