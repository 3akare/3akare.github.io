import { initializeApp } from "firebase/app";
import {
  collection, // returns collection ref (db, collection name)
  getFirestore,
  getDocs,
  addDoc,
  deleteDoc,
  doc, // returns document ref (db, collection name, docID)
  onSnapshot, // real-time connection
  query, // query firstore (colref, (where, orderBy)...)
  where, // condition for query (attribute, operator, matching value)
  orderBy, // ordering of snapshot returned (attribute, (asc, desc))
  serverTimestamp, // function to get the timestamp of document
  getDoc, // get a single doc (docRef)
  updateDoc, // update properties of an document
} from "firebase/firestore";

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAgaVyhRr-HVSRX9Q-zpQ0D0lSXEe_8FlE",
  authDomain: "fir-demo-1dd65.firebaseapp.com",
  projectId: "fir-demo-1dd65",
  storageBucket: "fir-demo-1dd65.appspot.com",
  messagingSenderId: "871874380877",
  appId: "1:871874380877:web:cd68c52018f2510ff5c804",
};

//init firebase app
initializeApp(firebaseConfig);

// gets the firestore services
const db = getFirestore();

// get the required collection from the database
const colRef = collection(db, "books");

// A async function that use getDocs() (which returns a promise), the interates through all the documents, and store them in an array
const getDocuments = async () => {
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((doc) => {
    books.push([{ ...doc.data(), id: doc.id }]);
  });
  // console.log(books);
};

// Add document to firestore
const addForm = document.querySelector(".add");
addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await addDoc(colRef, {
    Title: addForm.title.value,
    Author: addForm.author.value,
    createAt: serverTimestamp(),
  });

  // await getDocuments(); // Creates a pseudo real-time connection
  addForm.reset();
});

const q = query(colRef, orderBy("Title", "desc"));

// Real-time connection from firestore. Subscribes
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// delete document from firestore
const deleteForm = document.querySelector(".delete");
deleteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", deleteForm.docID.value);

  //get a single document
  const snapshot = await getDoc(docRef);
  console.log(snapshot.data());

  // await deleteDoc(docRef);
  deleteDoc(docRef);

  // await getDocuments(); //creates a psuedo real-time connection
  deleteForm.reset();
});

// const docRef = getDoc(db, "books", "vJ0tq7h487wEB0zgiiIG");
// onSnapshot(docRef, (doc) => {
//   console.log({ ...doc.data(), id: doc.id });
// });

const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", updateForm.docID.value);
  updateDoc(docRef, {
    Title: updateForm.Title.value,
    Author: updateForm.Author.value,
  });
  updateForm.reset();
});
