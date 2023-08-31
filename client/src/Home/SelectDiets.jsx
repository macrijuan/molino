import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getDiets} from "../redux/actions/diets";
import {setFilter_Arr, deleteFilter_Arr} from "../redux/actions/filters";

function SelectDiet(){

  const dispatch = useDispatch();

  const [pagination, setPagin]=useState({
    perPage:10, index:0
  });

  const diets = useSelector(state=>state.diets);
  const filter = useSelector(state=>state.filters.diets);

  function handleChange(e){
    if(e.target.value){
      dispatch(setFilter_Arr({value:e.target.value, prop:"diets"}));
    };
  };

  function deleteDiets(){
    if(filter){
      dispatch(deleteFilter_Arr({prop:"diets"}));
      document.getElementById("filter_diets").value = "";
    };
  };

  useEffect(()=>{
    if(!diets.rows)dispatch(getDiets(pagination.perPage, pagination.index));
  });

  return(
    diets.rows
    ?<div className="Select">
      <label>Diets:</label>
      <select onChange={(e)=>{handleChange(e)}} id="filter_diets">
        {filter?null:<option></option>}
        {
          diets.rows.map(diet=>(
            <option value={diet.name} key={diet.id}>
              {diet.name}
            </option>
          ))
        }
      </select>
      <button type="button" onClick={()=>{deleteDiets()}}>remove filter</button>
    </div>
    :null
  );
};

export default SelectDiet;