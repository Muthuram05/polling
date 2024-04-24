import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export async function getPoll(documentId){
    const docRef = doc(db, "poll", documentId);

    // Fetch the document
    const docSnapshot = await getDoc(docRef);

    // Check if the document exists
    if (docSnapshot.exists()) {
      // Document data
      const data = docSnapshot.data();
      console.log("Document data:", data);
      return data;
    } else {
      console.log("No such document!");
      return null;
    }
}

export async function createPoll(documentId, data){
    const docRef = doc(db, "poll", documentId);

    // Check if the document already exists
    const docSnapshot = await getDoc(docRef);
    const documentExists = docSnapshot.exists();

    if (documentExists) {
      // Document exists, update it
      await updateDoc(docRef, data);
      console.log("Document updated successfully!");
    } else {
      // Document does not exist, add it
      await setDoc(docRef, data);
      console.log("Document added successfully!");
    }
}