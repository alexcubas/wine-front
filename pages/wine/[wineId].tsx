import { useContext } from "react";
import ApplicationContext from "../../context/applicationContext";
import Image from 'next/image'

export const getStaticPaths = async() => {
  const res = await fetch('https://wine-back-test.herokuapp.com/products')
  const data = await res.json()
  const paths = data.items.map((_wine, index) => {
    return {
      params: { wineId: (index).toString() },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.wineId
  const allWines = await fetch(`https://wine-back-test.herokuapp.com/products`)
  const data = await allWines.json()
  const wineById = data.items.filter((wine) => wine.id === +id)

  return {
    props: { 
      wine: wineById[0],
      allWines: data
     }
  }
}

export default function Wine(wine) {
const {setCounterCart} = useContext(ApplicationContext);

  function AddToCart(id) {
    const cartCounter = JSON.parse(localStorage.getItem('prods'))
    const existsWine = wine.allWines.items.find((wine) => wine.id === id)
    
    !cartCounter ? localStorage.setItem('prods', JSON.stringify([existsWine]))
    : localStorage.setItem('prods', JSON.stringify([...cartCounter, existsWine]))

    setCounterCart(cartCounter ? cartCounter.length + 1 : 1)
  }

  function RemoveToCart(id) {
    const cartCounter = JSON.parse(localStorage.getItem('prods'))

    if(cartCounter) {
      const allLikeId = cartCounter.filter((prod) => prod.id === id)
      allLikeId.shift()
      const unLikeId = cartCounter.filter((prod) => prod.id !== id)
      
      const newArray = [...allLikeId, ...unLikeId]
      
      if(unLikeId.length !== cartCounter.length) setCounterCart(cartCounter ? cartCounter.length - 1 : 0)
      
      localStorage.setItem('prods', JSON.stringify(newArray))
      
    }
  }
  return(
    <>
      {
      <div>
        <div><Image width="350" height="350" src={wine.wine.image} alt={wine.wine.name}/></div>
        <div>
          <div>
          <h4>Vinhos {'>'} {wine.wine.country} {'>'} {wine.wine.region}</h4>
          <h1>{wine.name}</h1>
          <div>
            <Image width="50" height="50" src={wine.wine.flag} alt={wine.wine.name}/>
            <p>{wine.wine.country}</p>
            <p>{wine.wine.type}</p>
            <p>{wine.wine.classification}</p>
            <p>{wine.wine.volume}</p>
            <p>{wine.wine.rating}</p>
            <p>{"("}{wine.wine.avaliations}{")"}</p>
          </div>
        </div>
        <div>
          <h1>R${wine.wine.priceMember}</h1>
          <h3>NÃO SÓCIO R${wine.wine.priceNonMember}/UN.</h3>
        </div>
          <h4>Comentário do Sommelier</h4>
          <p>{wine.wine.sommelierComment}</p>
        </div>
        <button
          onClick={() => AddToCart(wine.wine.id)}
        >+</button> 
        <button
          onClick={() => RemoveToCart(wine.wine.id)}
        >-</button> 
        <div><button type='button' onClick={() => AddToCart(wine.wine.id)}>Adicionar</button></div>
        </div>
    }
    </>
  )
}