import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";

export let db = null;

if (isFirebaseConfigured()) {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
}

// Mock Data for when Firebase is not configured
const MOCK_POSTS = [
    {
        id: "1",
        title: "Strange Noises in Parts & Service",
        category: "Maintenance",
        excerpt: "Technicians report rhythmic banging coming from the back room during late-night shifts...",
        image: "assets/placeholder.png",
        content: "Complete report on the strange noises..."
    },
    {
        id: "2",
        title: "System Error: Camera 4B",
        category: "Security",
        excerpt: "Camera 4B has been experiencing frequent blackouts. Management suggests hardware failure...",
        image: "assets/placeholder.png",
        content: "Logs reveal something moving in the shadows..."
    }
];

export async function getPosts() {
    if (db) {
        try {
            const postsCol = collection(db, 'posts');
            const postsQuery = query(postsCol, orderBy('createdAt', 'desc'));
            const postSnapshot = await getDocs(postsQuery);
            return postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Error fetching posts:", error);
            return MOCK_POSTS;
        }
    }
    return MOCK_POSTS;
}

export async function addPost(postData) {
    if (db) {
        try {
            const { addDoc, serverTimestamp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
            const postsCol = collection(db, 'posts');
            await addDoc(postsCol, {
                ...postData,
                createdAt: serverTimestamp()
            });
            return true;
        } catch (error) {
            console.error("Error adding post:", error);
            throw error;
        }
    }
    console.warn("Firebase not configured. Post not saved.");
    return false;
}
