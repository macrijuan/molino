import {actions} from "./actions/actionNames";

const initialState = {
  user:{},
  reservations:{},
  diets:[],
  dishes:{},
  tastes:[],
  filters:{},
  errors:{}
};

function storeSeter(state, payload, prop){
  if(payload.errors){
    return {...state, errors:{...state.errors, ...payload}};
  }else{
    const newState = {...state, [prop]:payload};
    if(newState.errors[prop]) delete newState.errors[prop];
    return newState;
  };
};

function rootReducer(state=initialState, {payload, type}){
  // function rootReducer(state, {payload, type}){
  console.log(type);
  // console.log(payload);
  switch(type){
    case actions.USER: return storeSeter(state, payload, "user");
    case actions.RESERVATIONS: return storeSeter(state, payload, "reservations");
    case actions.DIETS: return storeSeter(state, payload, "diets");
    case actions.DISHES: return storeSeter(state, payload, "dishes");
    case actions.TASTES: return storeSeter(state, payload, "tastes");
    case actions.ARR_FILTERS:
      if(state.filters[payload.prop]){
        if(state.filters[payload.prop].includes(payload.value)){
          return state;
        }else return {...state, filters:{...state.filters, [payload.prop]:[...state.filters[payload.prop], payload.value]}};
      }else{
        return {...state, filters:{...state.filters, [payload.prop]:[payload.value]}};
      };
    case actions.DEL_ARR_FILTERS:
      if(state.filters[payload.prop]){
        const newState = {...state, filters:{...state.filters}};
        delete newState.filters[payload.prop];
        return newState;
      }else return state;
    case actions.DEL_ARR_VAL_FILTERS:
      if(state.filters[payload.prop].includes(payload.value)){
        return {...state, filters:{...state.filters, [payload.prop]:state.filters[payload.prop].toSpliced(state.filters[payload.prop].indexOf(payload.value),1)}};
      }else return state;
    case actions.STR_FILTERS:
      return {...state, filters:{...state.filters, [payload.prop]:payload.value}}
    case actions.DEL_STR_FILTERS:
      console.log(state.filters[payload.prop]);
      if(state.filters[payload.prop]){
        const newState = {...state, filters:{...state.filters}};
        delete newState.filters[payload.prop];
        return newState;
      }else return state;
    case actions.DEL_FILTERS:
      console.log(Object.keys(state.filters).length)
      if(Object.keys(state.filters).length){
        return {...state, filters:{}};
      }else return state;
    default: return state;
  };
};

export default rootReducer;