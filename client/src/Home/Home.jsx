import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getDishes, getFilteredDishes} from "../redux/actions/dishes.js";
import {deleteFilters} from "../redux/actions/filters.js";
import SessionButton from "../SessionButton/SessionButton.jsx";
import FilterBox from "./FilterBox.jsx";
import SelectDiet from "./SelectDiets.jsx";
import SelectTaste from "./SelectTaste.jsx";
import InputName from "./InputName.jsx";
import InputIngr from "./InputIngr.jsx";
import Card from "./Card.jsx";


function Home() {

  const [data, setData]=useState({
    perPage:8,
    index:0
  });

  const dispatch = useDispatch();

  const dishes = useSelector(state=>state.dishes);
  const filters = useSelector(state=>state.filters);

  useEffect(()=>{
    if(!dishes.rows){
      dispatch(getDishes(data.perPage, data.index));
      console.log("dishes re-rendered");
    }
  },[dishes.rows]);

  function handleSubmit(){
    if(Object.keys(filters).length){
      dispatch(getFilteredDishes(
        data.perPage, data.index,
        Object.keys(filters).map(prop=>`&${[prop]}=${filters[prop]}`).join("")
      ));
    }else{
      dispatch(getDishes(data.perPage, data.index));
    };
    console.log(filters);
  };

  function reseteFilters(){
    if(Object.keys(filters).length){
      dispatch(deleteFilters());
    };
  };
  
  return (
    <form className="Home" onSubmit={(e)=>{e.preventDefault(); handleSubmit()}}>
      <SessionButton />
      <FilterBox  />
      <button type="submit">Search dishes</button>
      <button type="reset" onClick={()=>{reseteFilters()}}>remove all filters</button>
      <SelectDiet  key={"diets"}/>
      <SelectTaste  key={"taste"}/>
      <InputName  key={"name"}/>
      <InputIngr  key={"ingredients"}/>
      {
        dishes.rows
        ?dishes.rows.map(dish=>(
          <Card props={dish} key={dish.id}/>
        ))
        :(<h4>There was a problem while requesting the dish data. Try refreshing the page.</h4>)
      }
    </form>
  );
}

export default Home;
