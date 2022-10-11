import { CustomButton } from "components/CustomButton";
import React from "react";
import { signOut } from "firebase/auth";
import { authService } from "FbInstance";
const Profile = () => {
  const signOutOnClick = async () => await signOut(authService);
  const inText = "Log Out";
  return (
    <>
      <span>Profile</span>
      <CustomButton onClickFunction={signOutOnClick} innerText={inText} />
    </>
  );
};
export default Profile;
