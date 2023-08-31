import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getTastes} from "../redux/actions/dishes";
import {setFilter_Str, deleteFilter_Str} from "../redux/actions/filters";

function SelectTaste(){

  const dispatch = useDispatch();

  const [pagination, setPagin]=useState({
    perPage:10, index:0
  });

  const tastes = useSelector(state=>state.tastes);
  const filter = useSelector(state=>state.filters.taste);

  useEffect(()=>{
    if(!tastes.length)dispatch(getTastes());
  });
  
  function handleChange(e){
    if(e.target.value)dispatch(setFilter_Str({prop:"taste", value:e.target.value}));
  };

  function deleteTaste(){
    if(filter){
      dispatch(deleteFilter_Str({prop:"taste"}));
      document.getElementById("filter_taste").value = "";
    };
  };

  return(
    tastes.length
    ?<div className="Select">
      <label>Taste:</label>
      <select onChange={(e)=>{handleChange(e)}} id="filter_taste" >
      {filter?null:<option></option>}
        {
          tastes.map(taste=>(
            <option value={taste} key={taste}>
              {taste}
            </option>
          ))
        }
      </select>
      <button type="button" onClick={()=>{deleteTaste()}}>remove filter</button>
    </div>
    :null
  );
};

export default SelectTaste;