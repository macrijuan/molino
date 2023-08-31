import {actioner, actions} from "./actionNames.js";

// export const postUser = (data) => {
//   return async function(dispatch){
//     fetch(`${server}/${type}/user/post_user`,{
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(data)
//     }).then(res=>res.json())
//     .then(res=>dispatch(actioner(actions.USER, res)));
//   };
// };

export const postReservation = (data, user) => async dispatch => {
  fetch(`${process.env.REACT_APP_SERVER}/${process.env.REACT_APP_TYPE}/reservation/post_reservation/${user}`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(res=>res.json())
  .then(res=>dispatch(actioner(actions.USER, res)));
};