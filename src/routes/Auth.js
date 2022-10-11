import { authService } from "FbInstance";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNetAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        //새로운 계정만들기
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        //로그인
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNetAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    let provider;
    switch (event.target.name) {
      case "google":
        provider = new GoogleAuthProvider();

        break;
      case "github":
        provider = new GithubAuthProvider();
        break;
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email" //form data를 보낼 때 구분
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        ></input>
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          autoComplete="off"
        ></input>
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
        ></input>
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Log In" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
