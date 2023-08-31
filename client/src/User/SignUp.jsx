import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {postUser} from "../redux/actions/user.js"
import {Redirect} from "react-router-dom"

function PostUser(){
  const initialState = {
    first_name:"",
    last_name:"",
    email:"",
    password:""
  };

  const [data, setData]=useState(initialState);

  const errors = useSelector((state)=>state.errors);
  const user = useSelector(state=>state.user);

  const handleChange = (event)=>{
    setData({...data, [event.target.name]:event.target.value});
  };
  
  const dispatch = useDispatch();
  
  const handleSubmit = (event)=>{
    event.preventDefault();
    dispatch(postUser(data));
  };

  return(
    user.email
    ?<Redirect to="/" />
    :<form onSubmit={(e)=>{handleSubmit(e)}} >
      {Object.keys(initialState).map((prop,i,arr)=>{
        return(
          <div id={prop} key={prop} style={{marginBottom:"1.5%"}}>
            <label>{prop.replace("_", " ").replace(prop[0], prop[0].toUpperCase())}</label>
            <input value={data[prop]} name={prop} onChange={(e)=>{handleChange(e)}}/>
            {
              errors.errors!==undefined
              ?errors.errors[prop]
                ?errors.errors[prop].map((err,i2)=>(<p style={{margin:"0px"}} key={prop+i2}><b>{err}</b></p>))
                :null
              :null
            }
          </div>
        )
      })}
      <button>Submit</button>
    </form> 
  );
};

export default PostUser;