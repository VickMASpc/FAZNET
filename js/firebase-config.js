// Firebase Configuration
// REPLACE THESE WITH YOUR ACTUAL PROJECT CREDENTIALS FROM THE FIREBASE CONSOLE
export const firebaseConfig = {
  apiKey: "AIzaSyBYvwxEkE2mISHdITtM09yafy3Te-H80Uk",
  authDomain: "faznet-1489b.firebaseapp.com",
  projectId: "faznet-1489b",
  storageBucket: "faznet-1489b.firebasestorage.app",
  messagingSenderId: "147577671571",
  appId: "1:147577671571:web:da0fba43dea014d59f6266",
  measurementId: "G-FH5WC46RQK"
};

// Check if credentials are set
export const isFirebaseConfigured = () => {
    return firebaseConfig.apiKey !== "YOUR_API_KEY";
};
