import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {setFilter_Arr, deleteFilter_Arr} from "../redux/actions/filters.js";

function InputIngr() {

  const dispatch = useDispatch();

  const filter = useSelector(state=>state.filters.ingredients);

  function addIngredients(data){
    if(data){
      dispatch(setFilter_Arr({prop:"ingredients", value:data}));
      document.getElementById("filter_ingredients").value = "";
    };
  };

  function deleteIngrediets(){
    if(filter){
      dispatch(deleteFilter_Arr({prop:"ingredients"}));
      document.getElementById("filter_ingredients").value = "";
    };
  };

  return(
    <div className="Home">
      <label>Ingredients:</label>
      <input placeholder="Dish ingredient" id="filter_ingredients"/>
      <button type="button" onClick={()=>{addIngredients(document.getElementById("filter_ingredients").value)}}>Add ingredient</button>
      <button type="button" onClick={()=>{deleteIngrediets()}}>remove filter</button>
    </div>
  );
};

export default InputIngr;
