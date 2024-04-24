import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, deleteDoc, } from "firebase/firestore";
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


export async function deletePoll(value) {
  try {
    // Query the collection to find documents where the specified field equals the value
    const q = query(collection(db, "poll"), where("id", "==", value));
    const querySnapshot = await getDocs(q);

    // Iterate over the documents and delete each one
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log(`Document ${doc.id} successfully deleted!`);
    });
  } catch (error) {
    console.error("Error deleting documents:", error);
    throw error;
  }
}

export async function getSpecificPoll(id){
  
  const q = query(collection(db, "poll"), where("id", "==", id));
  const querySnapshot = await getDocs(q);

  // Check if a document matching the specified id was found
  if (!querySnapshot.empty) {
    // There should be only one document with the specified id, so we return the first one
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } else {
    // No document found with the specified id
    return null;
  }
  
}