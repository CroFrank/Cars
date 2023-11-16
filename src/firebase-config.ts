// import { initializeApp } from "firebase/app"
// import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
  collection: import.meta.env.VITE_collection,
}

export const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/${firebaseConfig.collection}?key=${firebaseConfig.apiKey}`

// export const app = initializeApp(firebaseConfig)
// export const db = getFirestore(app)
