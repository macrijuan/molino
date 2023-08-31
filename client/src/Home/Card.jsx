import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getDishes} from "../redux/actions/dishes.js";
import {Link} from "react-router-dom";
// import Filter from "./Filter.jsx";


function Card({props}) {
  const [descr, setDescr]=useState("Show description");
  function handleClick(){
    descr==="Show description"
    ?setDescr("Hide description")
    :setDescr("Show description")
  };

  return (
    <div className="Card" style={{border:"solid"}}>
      <h2>{props.name}</h2>
      <img src={props.image} alt={props.name+" image presentation"}/>
      <h4 >Diets:</h4>
      <p >{props.diets.join(", ")}</p>
      <h4 >Ingredients:</h4>
      <p >{props.ingredients.join(", ")}</p>
      <h4 >Taste:</h4>
      <p >{props.taste}</p>
      {
        descr==="Hide description"
        ?
          <div>
          <h4>Description:</h4>
          <p>{props.description}</p>
          </div>
        :null
      }
      {
        props.description
        ?<button onClick={()=>{handleClick()}}>{descr}</button>
        :null
      }
    </div>
  );
}

export default Card;