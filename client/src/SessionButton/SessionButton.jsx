import { useSelector } from "react-redux";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";

function SessionButton(){
  const user = useSelector(state=>state.user);
  return(
    user.email
    ?<div id="session_button">
      <SignOutButton user={user}/>
      <h3>User: {user.first_name} {user.last_name}</h3>
    </div>
    :<SignInButton />
  );
};

export default SessionButton;