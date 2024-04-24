import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, } from "firebase/firestore";
import { db } from "../services/firebase";

export async function getPoll(authorId){
  const q = query(collection(db, "poll"), where("author", "==", authorId));

  const querySnapshot = await getDocs(q);
  const polls = [];
  querySnapshot.forEach((doc) => {
    polls.push({ id: doc.id, ...doc.data() });
  });
  return polls;
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