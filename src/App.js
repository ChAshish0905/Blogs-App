import { useState, useEffect } from "react";
import React from "react";
import MainHeader from "./Components/MainHeader/MainHeader";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import { useNavigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const LoginHandler = (username, password) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "1");
    setUsername(username);
  };

  const LogoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <div>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={LogoutHandler} />
      <p>{username}</p>
      <main>
        {!isLoggedIn && <Login onLogin={LoginHandler} />}
        {isLoggedIn && <Home username={username} onLogout={LogoutHandler} />}
      </main>
    </div>
  );
}

export default App;
