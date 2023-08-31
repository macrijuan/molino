import { Redirect } from "react-router-dom";
import { useState } from "react";

function SignInButton(){
  const [redirect, setRedirect]=useState(false);
  return(
    redirect
    ?<Redirect to="/sign_in" />
    :<button type="button" onClick={()=>{setRedirect(true)}}>Sign In</button>
  );
};

export default SignInButton;