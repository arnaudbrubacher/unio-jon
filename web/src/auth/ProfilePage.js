// import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const Profile = () => {
  const { state, } = useContext(AuthContext)

  return (
    <div>
      <img src={state.user.picture} alt={state.user.name} />
      <h2>{state.user.name}</h2>
      <p>{state.user.email}</p>
    </div>
  );
};

export default Profile;