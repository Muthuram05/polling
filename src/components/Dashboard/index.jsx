import React from "react";
import { auth } from "../../services/firebase";
import { userStore } from "../../store";
import { createPoll } from "../../controllers/poll";

export function Dashboard() {
  const user = userStore((state) => state.user);

  // Check if user is signed in
  const userId = user ? user.uid : null;

  const data = {
    Id: userId, // Store user's UID instead of the entire user object
    title: "string",
    options: ["one", "two"],
    Type: "single",
    responses: [{
      id: "string",
      name: "string",
      option: ["string"]
    }],
    author: "string"
  };
  function submit() {
    createPoll("2", data).then((data) => console.log(data));
  }
  return (
    <div>
      {user && <button onClick={() => auth.signOut()}>Logout</button>}
      Dashboard
      <button onClick={submit}></button>
    </div>
  );
}
