// const actions = {
//   USER:{
//     POST: "POST_USER",
//     GET: "GET_USER",
//     UPDATE: "UPDATE_USER",
//     DELETE: "DELETE_USER",
//   },
//   RESERVATION:{
//     POST: "POST_RESERVATIONS",
//     GET: "GET_RESERVATIONS",
//     UPDATE: "UPDATE_RESERVATIONS",
//     DELETE: "DELETE_RESERVATION",
//   },
//   GET_DIETS : "GET_DIETS",
//   GET_DISHES : "GET_DISHES",
// };
export const actions = {
  USER: "USER",
  RESERVATIONS: "RESERVATIONS",
  DIETS: "DIETS",
  DISHES: "DISHES",
  TASTES: "TASTES",
  ARR_FILTERS: "ARRFILTERS",
  DEL_ARR_FILTERS: "DELETE_ARR_FILTERS",
  DEL_ARR_VAL_FILTERS: "DEL_ARR_VAL_FILTERS",
  STR_FILTERS: "STR_FILTERS",
  DEL_STR_FILTERS: "DELETE_STR_FILTERS",
  DEL_FILTERS: "DEL_FILTERS"
};

export function actioner(type, payload){
  return {type:type, payload:payload};
};