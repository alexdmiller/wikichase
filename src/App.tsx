import React, { useState, useEffect, FormEvent } from 'react';
import firebase from "firebase";
import logo from './logo.svg';
import './App.css';
import { firebaseConfig } from './secrets';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

firebase.initializeApp(firebaseConfig);

// Set the configuration for your app
// TODO: Replace with your project's config object

const functions = firebase.functions();

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver();
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
  return (
    <div>
      <h1>My App</h1>
      <p>Welcome {firebase.auth().currentUser?.email}! You are now signed-in!</p>
      <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
    </div>
  );

//  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />    
}

// function App() {
//   const [page, setPage] = useState("");
//   const [pageContent, setPageContent] = useState("");

//   // useEffect(() => {

//   // });

//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault();
//     const getWikiPage = firebase.functions().httpsCallable('getWikiPage');
//     const response = await getWikiPage({ page });
//     setPageContent(response.data);
//   }

//   return <div>
//     <form onSubmit={handleSubmit}>
//       <input onChange={e => setPage(e.target.value)} value={page}></input>
//       <button type="submit">Go</button>
//     </form>
//     <div dangerouslySetInnerHTML={{ __html: pageContent }}>
//     </div>
//   </div>
// }

// Get a reference to the database service
// var database = firebase.database();

// function App() {
//   const [messages, setMessages] = React.useState([""]);
//   const [message, setMessage] = React.useState("");

//   React.useEffect(() => {
//     try {
//       database.ref("messages").on("value", snapshot => {
//         let chats: any[] = [];
//         snapshot.forEach((snap) => {
//           chats.push(snap.val());
//         });
//         setMessages(chats);
//       });
//     } catch (error) {
//     }
//   }, []);


//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault();
//     try {
//       await database.ref("messages").push(message);
//       setMessage("");
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className="App">
//       {messages.map(x => <div>{x}</div>)}

//       <form onSubmit={handleSubmit}>
//         <input onChange={e => setMessage(e.target.value)} value={message}></input>
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// }

export default App;
