import React, { useEffect } from "react";
import { Card } from "./Card";
import { useState } from "react";




// Component that changes the src of and image card
export const Slider = () => {
  const fotos = ["url('https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
  "url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1494&q=80')",
   "url('https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1484&q=80')",
    "url('https://images.unsplash.com/photo-1556856425-366d6618905d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=664&q=80')",
    "url('https://images.unsplash.com/photo-1563679200937-f4266649d170?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')" ];
    
     const [currentItem, setItem] = useState(0);

    
  useEffect(() => {
   
    
   const intervalId = setInterval(() => {
    document.getElementById('home-card').classList.add('fade-in');
      fotos.forEach(foto => {
        if(currentItem === fotos.length -1){
        setItem(0);
      } 
        else{
        setItem(currentItem + 1)
      }
     
    })
    
        setTimeout(()=>{
            document.getElementById('home-card').classList.remove('fade-in')
        },300)
     

      }, 15000);

      return () => clearInterval(intervalId);
      
  }, );
 

  
    
  return <>
  
   <Card page={"home"} background={fotos[currentItem]} />
  
  </>

};