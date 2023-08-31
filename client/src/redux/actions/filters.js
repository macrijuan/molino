import {actioner, actions} from "./actionNames";

export const setFilter_Arr = (data)=>actioner(actions.ARR_FILTERS, data);
export const deleteFilter_Arr = (data)=>actioner(actions.DEL_ARR_FILTERS, data);
export const deleteFilter_Arr_Val = (data)=>actioner(actions.DEL_ARR_VAL_FILTERS, data);
export const setFilter_Str = (data)=>actioner(actions.STR_FILTERS, data);
export const deleteFilter_Str = (data)=>actioner(actions.DEL_STR_FILTERS, data);
export const deleteFilters = ()=>actioner(actions.DEL_FILTERS);