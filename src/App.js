import React, { useState,useEffect } from 'react';
import { csv,max,scaleBand,scaleLinear } from 'd3';
/* import {max} from 'd3-array'; */
import './App.css';
 
const csvURL = 'https://raw.githubusercontent.com/WilderGitHub/csvs/main/datos.csv';

const App = () => {
  const [data, setData]= useState(null);
  useEffect(() => {
    //csv(csvURL).then(data=>{setData(data)})  Esto es equivalente a la linea de abajo
    csv(csvURL).then(setData) 
    
  }, []);
   if(!data){
    
    return <pre>Cargando..</pre>
    
  } 
  //console.log(data);
  //console.log("maximo");
  //console.log(max(data,d=>d.poblacion));  
  const escalaAncho = scaleLinear().domain([0,max(data,d=>d.poblacion)]).range([0,400]);
  const escalaY = scaleBand().domain(data.map(d=>d.pais)).range([0,200]);
  return (
      <svg width='500' height='500'>
        {data.map((d,i)=>
        <text x="10" y={escalaY(d.pais)} fill="red">{(i+1) + d.pais}</text>
        )}
        {data.map((d,i)=>
        <rect x="90" y={escalaY(d.pais)} width={escalaAncho(d.poblacion)} height={escalaY.bandwidth()/2} />
        
        )}
                
      </svg>
  )
}
export default App

