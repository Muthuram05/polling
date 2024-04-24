import "./App.css";
import LoginForm from "./components/login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./services/firebase";
import { userStore } from './store';
import { useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { BrowserRouter as Router , Routes, Route} from "react-router-dom"
import { SignUp } from './components/signup';
import { PollBuilder } from './components/pollbuilder';

function App() {
  const [user] = useAuthState(auth);
  const setUser = userStore((state) => state.setUser);
  useEffect(() => {
    console.log(user);
    setUser(user);
  });
  return (
    <div className="App">
       <div>
          <PollBuilder />
        </div>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <LoginForm />} />
          <Route path="/sign-in" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
      {/* {user ? <Dashboard /> : <LoginForm />} */}
    </div>
  );
}

export default App;
