import React from "react";
import { auth } from "../../services/firebase";
import { userStore } from "../../store";

export function Dashboard() {
  const user = userStore((state) => state.user);
  return (
    <div>
     
      Dashboard
    </div>
  );
}
