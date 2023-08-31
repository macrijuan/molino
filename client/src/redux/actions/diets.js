import {actioner, actions} from "./actionNames";

export function getDiets(perPage,index){
  return async function(dispatch){
    fetch(`${process.env.REACT_APP_SERVER}/${process.env.REACT_APP_TYPE}/diet/get_diets?perPage=${perPage}&index=${index}`)
    .then(res=>res.json())
    .then(res=>dispatch(actioner(actions.DIETS, res)));
  };
};