import "./App.css";
import LoginForm from "./components/login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./services/firebase";
import { userStore } from "./store";
import { useEffect } from "react";
import { Dashboard } from "./components/Dashboard";

function App() {
  const [user] = useAuthState(auth);
  const setUser = userStore((state) => state.setUser);
  useEffect(() => {
    console.log(user);
    setUser(user);
  });
  return <div className="App">{user ? <Dashboard /> : <LoginForm />}</div>;
}

export default App;
