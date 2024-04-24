import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { userStore } from "../store";

const POLLS_COLLECTION = "poll";

function isAuthenticatedUser() {
  return userStore.getState().user?.uid;
}

export async function getPoll(authorId) {
  const q = query(collection(db, "poll"), where("author", "==", authorId));

  const querySnapshot = await getDocs(q);
  const polls = [];
  querySnapshot.forEach((doc) => {
    polls.push({ id: doc.id, ...doc.data() });
  });
  return polls;
}

export async function createPoll(documentId, data) {
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

export async function getSpecificPoll(id) {
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

export async function updatePoll(data) {
  let { title, options, id } = data;

  if (isAuthenticatedUser()) {
    let pollDocRef = doc(db, POLLS_COLLECTION, id);

    const docSnap = await getDoc(pollDocRef);

    if (docSnap.exists()) {
      let dataToUpdate = {};

      if (title) dataToUpdate.title = title;
      if (Array.isArray(options)) dataToUpdate.options = options;

      if (Object.keys(dataToUpdate).length)
        return await updateDoc(pollDocRef, dataToUpdate);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
}

export async function getResponses(data) {
  let { id } = data;

  if (isAuthenticatedUser()) {
    let pollDocRef = doc(db, POLLS_COLLECTION, id);

    const docSnap = await getDoc(pollDocRef);

    if (docSnap.exists()) {
      let pollData = docSnap.data();
      let res = { title: pollData.title, vote: {} };

      for (let option of pollData.options) {
        let q = query(
          collection(db, POLLS_COLLECTION, id),
          where("responses", "array-contains", option)
        );
        let responseSnapshot = await getDocs(q);
        res["vote"][option] = responseSnapshot.size;
      }
      return res;
    } else {
      console.log("No such poll!");
    }
  }
}
