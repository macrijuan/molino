import {actioner,actions} from "./actionNames";

// export function getDishes(perPage, index){
//   return async function(dispatch){
//     fetch(`${process.env._REACT_APP_SERVER}/${process.env._REACT_APP_TYPE}/dishes/get_dishes?perPage${perPage}%index=${index}`)
//     .then(res=>res.json())
//     .then(res=>dispatch(actioner(actions.DISHES,res)));
//   };
// };

export const getDishes = (perPage, index) => {
  return async function(dispatch){
    fetch(`${process.env.REACT_APP_SERVER}/${process.env.REACT_APP_TYPE}/dish/get_dishes?perPage=${perPage}&index=${index}`)
    .then(res=>res.json())
    .then(res=>dispatch(actioner(actions.DISHES, res)));
  };
};

export function getFilteredDishes (perPage, index, data) {
  return async function(dispatch){
    fetch(`${process.env.REACT_APP_SERVER}/${process.env.REACT_APP_TYPE}/dish/get_by_filter?perPage=${perPage}&index=${index}${data}`)
    .then(res=>res.json())
    .then(res=>dispatch(actioner(actions.DISHES, res)));
  };
};

export function getTastes(){
  return async function (dispatch){
    fetch(`${process.env.REACT_APP_SERVER}/${process.env.REACT_APP_TYPE}/dish/get_tastes`)
    .then(res=>res.json())
    .then(res=>dispatch(actioner(actions.TASTES, res)));
  };
};