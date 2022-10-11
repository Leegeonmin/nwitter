import React from "react";
import { signOut } from "firebase/auth";
import { authService } from "FbInstance";
import { CustomButton } from "../components/CustomButton";

const Home = () => {
  const signOutOnClick = async () => await signOut(authService);
  const inText = "Log Out";

  return (
    <>
      <span>Home</span>
      <CustomButton onClickFunction={signOutOnClick} innerText={inText} />
    </>
  );
};
export default Home;
