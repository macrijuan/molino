import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {deleteFilter_Arr, deleteFilter_Arr_Val} from "../redux/actions/filters.js";

function FilterBox (){

  const dispatch = useDispatch();

  const filters = useSelector(state=>state.filters);

  function deleteIngredient({prop, value}){
    if(filters[prop].length>1){
      dispatch(deleteFilter_Arr_Val({prop, value}));
    }else{
      dispatch(deleteFilter_Arr({prop}));
      document.getElementById("filter_"+prop).value = "";
    }
  };

  return(
    <div>
      <h3>Applied filters:</h3>
      <hr></hr>
      {
        Object.keys(filters).length
        ?Object.keys(filters).map(prop=>(
          <div style={{border:"solid"}} key={prop}>
            <h4>{prop.replace(prop[0],prop[0].toUpperCase())}</h4>
            {typeof filters[prop] === "string" ?<p>{filters[prop]}</p> :filters[prop].map(
              value=>
              <div key={value}>
                <p>{value}</p><button type="button" onClick={()=>{deleteIngredient({prop, value})}}>X</button>
              </div>
            )}
          </div>
        )):<p>No filters applied.</p>
      }
    </div>
  );
};

export default FilterBox;