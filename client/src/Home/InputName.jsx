import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter_Str, deleteFilter_Str } from "../redux/actions/filters";

function InputName(){

  const dispatch = useDispatch();

  const filter = useSelector(state=>state.filters.name);
  
  function addNameFilter(data){
    if(data){
      dispatch(setFilter_Str({prop:"name", value: data}));
      document.getElementById("filter_name").value = "";
    };
  };

  function deleteNameFilter(){
    if(filter)dispatch(deleteFilter_Str({prop:"name"}));
    document.getElementById("filter_name").value = "";
  };

  return(
    <div className="Input">
      <label>Name:</label>
      <input placeholder="Dish name" id="filter_name"/>
      <button type="button" onClick={()=>{addNameFilter(document.getElementById("filter_name").value)}}>apply filter</button>
      <button type="button" onClick={()=>{deleteNameFilter()}}>remove filter</button>
    </div>
  );
};

export default InputName;