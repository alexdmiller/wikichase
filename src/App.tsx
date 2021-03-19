import React, { FormEvent } from 'react';
import firebase from "firebase";
import logo from './logo.svg';
import './App.css';
import { firebaseConfig } from './secrets';

// Set the configuration for your app
// TODO: Replace with your project's config object

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

function App() {
  const [messages, setMessages] = React.useState([""]);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    try {
      database.ref("messages").on("value", snapshot => {
        let chats: any[] = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        setMessages(chats);
      });
    } catch (error) {
    }
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await database.ref("messages").push(message);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      {messages.map(x => <div>{x}</div>)}

      <form onSubmit={handleSubmit}>
        <input onChange={e => setMessage(e.target.value)} value={message}></input>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
