import {actions, actioner} from "./actionNames";

export const postUser = (data) => {
  return async function(dispatch){
    fetch(`${process.env.REACT_APP_SERVER}/${process.env.REACT_APP_TYPE}/user/post_user`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res=>res.json())
    .then(res=>dispatch(actioner(actions.USER, res)));
  };
};

export function getUser(id){
  return async dispatch=>{
    fetch(`${process.env.REACT_APP_SERVER}/${process.env.REACT_APP_TYPE}/user/get_user/${id}`)
    .then(res=>{
      dispatch({type:"USER", payload:res});
    });
  };
};

export function userSignIn (data){
  return async dispatch=>{
    fetch(`${process.env.REACT_APP_SERVER}/${process.env.REACT_APP_TYPE}/user/get_by_email`,{
      method:"POST", headers:{"Content-type":"application/json"}, body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(res=>{
      dispatch({type:"USER", payload:res});
    });
  };
};

export function updateuser(id, data){
  return dispatch=>{
    fetch(`${process.env.REACT_APP_SERVER}/${process.env.REACT_APP_TYPE}/user/update_user/${id}`,
    { method:"PUT", body: JSON.stringify(data) }) //mode: "no-corse",
    .then(res=>{
      dispatch({type:"USER", payload:res});
    });
  };
};

export function deleteUser(id){
  return async dispatch=>{
    fetch(`${process.env.REACT_APP_SERVER}/${process.env.REACT_APP_TYPE}/user/delete_user/${id}`,
    {method:"DELETE"} //, mode: "no-corse"
    ).then(res=>{
      dispatch({type:"USER", payload:res});
    });
  };
};

export function userSignOut(){
  return actioner(actions.USER, {});
};