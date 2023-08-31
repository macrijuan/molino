import {useDispatch, useSelector} from "react-redux";
import {userSignIn} from "../redux/actions/user.js";
import { Link, Redirect } from "react-router-dom";


function SignIn(){
  const dispatch=useDispatch();
  const user = useSelector(state=>state.user.email);
  const errors = useSelector(state=>state.errors);
  async function handleSubmit(e){
    console.log(errors);
    e.preventDefault();
    if(!user)dispatch(userSignIn({email:document.getElementById("email").value, password:document.getElementById("password").value}))
  };
  function handleErrors(){
    if(errors.errors){
      if(errors.errors.not_found){
        return <p>{errors.errors.not_found}</p>
      }else if(errors.errors.password)return <p>{errors.errors.password}</p>
    };
  };
  return(
    user
    ?<Redirect to="/" />
    :
    <form onSubmit={(e)=>{handleSubmit(e)}}>
    <h2>Sign in</h2>
    <input placeholder="Email here" id="email"/>
    <input placeholder="Password here" id="password"/>
    {handleErrors()}
    <button>sign in</button>
    <p><Link to="/sign_up">If you don't have an account, you can create one by clicking here</Link></p>
  </form>
  );
};

export default SignIn;;