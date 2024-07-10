
const firebaseConfig = {
  apiKey: "AIzaSyC4AMEptpxUauG3BzZ6I-OzoMhYwJ5T-xQ",
  authDomain: "notesdb-8abcd.firebaseapp.com",
  projectId: "notesdb-8abcd",
  storageBucket: "notesdb-8abcd.appspot.com",
  messagingSenderId: "232066222820",
  appId: "1:232066222820:web:460aef00a1daa0393fbaf1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let template = document.getElementById("blueprint");
let addNoteButton = document.getElementById("addnote");
let samplenote = document.getElementsByClassName("samplenote");
let noteContainer = document.querySelector(".inner2");
let pageTemplate = document.getElementById("page");
const dialog = document.querySelector("dialog");
let pageTitle = dialog.querySelector(".pageTitle");
let pagetext = dialog.querySelector(".pagetext");
let saveBtn = dialog.querySelector("#save");
let deleteBtn = document.querySelector("#deleteBtn");
let currentNote = null;

function addNewNote() {
  currentNote = null;
  pageTitle.value = "";
  pagetext.value = "";
  dialog.showModal();
}

function saveNote() {
  let newNote;
  if (currentNote == null) {
      newNote = template.cloneNode(true);
      newNote.id = "";
      newNote.style.display = "block";
      noteContainer.appendChild(newNote);
      
      // Save to Firestore
      db.collection("notes").add({
          title: pageTitle.value,
          content: pagetext.value
      }).then((docRef) => {
          newNote.setAttribute('data-id', docRef.id);
          let newNoteTitle = newNote.querySelector("#title");
          let newNotetext = newNote.querySelector(".noteContent");
          newNoteTitle.value = pageTitle.value;
          newNotetext.textContent = pagetext.value;
      }).catch((error) => {
          console.error("Error adding document: ", error);
      });
  } else {
      newNote = currentNote;
      let docId = newNote.getAttribute('data-id');
      
      // Update Firestore
      db.collection("notes").doc(docId).update({
          title: pageTitle.value,
          content: pagetext.value
      }).then(() => {
          let newNoteTitle = newNote.querySelector("#title");
          let newNotetext = newNote.querySelector(".noteContent");
          newNoteTitle.value = pageTitle.value;
          newNotetext.textContent = pagetext.value;
      }).catch((error) => {
          console.error("Error updating document: ", error);
      });
  }

  dialog.close();
  currentNote = null;
}



function deleteNote() {
  let tempNote = currentNote;
  let docId = tempNote.getAttribute('data-id');
  
  // Delete from Firestore
  db.collection("notes").doc(docId).delete().then(() => {
      noteContainer.removeChild(tempNote);
      currentNote = null;
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
}

noteContainer.addEventListener("click", function (event) {
    let note = event.target.closest('.samplenote')
    if(note && !event.target.matches("#deleteBtn")) {
       currentNote = note;
       let title = currentNote.querySelector("#title");
       let content = currentNote.querySelector(".noteContent");
       pageTitle.value = title.value;
       pagetext.value = content.textContent;
       dialog.showModal();
    }
    if(event.target.matches("#deleteBtn")) {
      currentNote = note;
      alert("Are you sure you want to delete this note");
      deleteNote();
    }
});

addNoteButton.addEventListener("click", addNewNote);
saveBtn.addEventListener("click", saveNote);

document.addEventListener('DOMContentLoaded', async function()  {
  const notedata = await db.collection("notes").get();
  console.log(notedata);
  notedata.forEach((doc) => {
    let noteData = doc.data();
    let newNote = template.cloneNode(true);
    newNote.id = "";
    newNote.setAttribute('data-id', doc.id);
    newNote.style.display = "block";

    let newNoteTitle = newNote.querySelector("#title");
    let newNotetext = newNote.querySelector(".noteContent");
    newNoteTitle.value = noteData.title;
    newNotetext.textContent = noteData.content;
    noteContainer.appendChild(newNote);
});
  
});
