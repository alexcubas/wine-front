import { useContext, useEffect } from "react"
import { useState } from "react"
import ApplicationContext from "../context/applicationContext";

export default function PriceLimit() {
  const {setFilter} = useContext(ApplicationContext);

  useEffect(() => {
    console.log(setFilter);
    
  }, [setFilter])

  return(
    <>
      <form >
          <input type="radio" id="Todos" name="price" value="0-1000" onClick={e => setFilter(e.currentTarget.value)}/>
          <label htmlFor="Todos" >Todos</label><br/>
          <input type="radio" id="40" name="price" value="0-40" onClick={e => setFilter(e.currentTarget.value)}/>
          <label htmlFor="40" >Até R$40</label><br/>
          <input type="radio" id="R$40 A R$60" name="price" value="40-80" onClick={e => setFilter(e.currentTarget.value)}/>
          <label htmlFor="R$40 A R$60">R$40 A R$60</label><br/>
          <input type="radio" id="R$100 A R$200" name="price" value="100-200" onClick={e => setFilter(e.currentTarget.value)}/>
          <label htmlFor="R$100 A R$200">R$100 A R$200</label>
          <input type="radio" id="R$200 A R$500" name="price" value="200-500" onClick={e => setFilter(e.currentTarget.value)}/>
          <label htmlFor="R$200 A R$500">R$200 A R$500</label>
          <input type="radio" id="Acima de R$500" name="price" value="500-1000" onClick={e => setFilter(e.currentTarget.value)}/>
          <label htmlFor="Acima de R$500">Acima de R$500</label>
      </form>
    </>
  )
}