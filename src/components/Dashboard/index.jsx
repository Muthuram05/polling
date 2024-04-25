import React from "react";
import { auth } from "../../services/firebase";
import { userStore } from "../../store";
import { createPoll } from "../../controllers/poll";

export function Dashboard() {
  const user = userStore((state) => state.user);

  return (
    <div>
      {user && <button onClick={() => auth.signOut()}>Logout</button>}
    </div>
  );
}
