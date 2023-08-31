import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignOut } from "../redux/actions/user";

function SignOutButton({user}){
  const dispatch = useDispatch();
  
  function handleClick(){
    dispatch(userSignOut());
  };
  return(
    user
    ?<button type="button" onClick={()=>{if(window.confirm("do you want to sign out?")){handleClick();};}}>sign out</button>
    :<Redirect to="/sign_in" />
  );
};

export default SignOutButton;