import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
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
      let res = { title: pollData.title };

      for (let option of pollData.options) {
        let q = query(
          collection(db, POLLS_COLLECTION, id),
          where("responses", "array-contains", option)
        );
        let responseSnapshot = await getDocs(q);
        res[option] = responseSnapshot.size;
      }
    } else {
      console.log("No such document!");
    }
  }
}
