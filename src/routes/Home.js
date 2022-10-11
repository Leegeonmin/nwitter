import React from "react";
import { signOut } from "firebase/auth";
import { authService } from "FbInstance";
import { CustomButton } from "../components/CustomButton";

const Home = () => {
  const signOutClick = async () => await signOut(authService);
  const inText = "Log Out";

  return (
    <>
      <span>Home</span>
      <CustomButton onClickFunction={signOutClick} innerText={inText} />
    </>
  );
};
export default Home;
