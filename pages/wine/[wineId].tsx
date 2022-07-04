import { useContext, useEffect, useState } from "react";
import ApplicationContext from "../../context/applicationContext";
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/DescriptWine.module.css'

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
const {counterCart, setCounterCart, inCart, setInCart} = useContext(ApplicationContext);

  useEffect(() => {
    const cartCounter = JSON.parse(localStorage.getItem('prods'))
    const res = cartCounter?.filter((prod) => prod.id === wine.wine.id)
    cartCounter ? setInCart(res.length) : null
  }, [counterCart])

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
      <Link href={`/`}><a className={styles.textVoltar}>{"<"}voltar</a></Link>
      {
      <div className={styles.descFather}>
        <div className={styles.descImage}>
          <Image width="1250" height="1250" src={wine.wine.image} alt={wine.wine.name}/>
        </div>
        <div className={styles.descSun}>
          <div id={styles.maxW}>
            <h4 className={styles.descFather}><p className={styles.pinkText}>Vinhos {'>'} {wine.wine.country}</p> <p className={styles.whereText}>{'>'} {wine.wine.region}</p> </h4>
            <h1 className={styles.boldText}>{wine.wine.name}</h1>
          <div/>
          <div className={styles.descAbout}>
            <Image width="25" height="25" src={wine.wine.flag} alt={wine.wine.name}/>
            <p className={styles.descAboutDetails}>{wine.wine.country}</p>
            <p className={styles.descAboutDetails}>{wine.wine.type}</p>
            <p className={styles.descAboutDetails}>{wine.wine.classification}</p>
            <p className={styles.descAboutDetails}>{wine.wine.volume}</p>
            <p className={styles.descAboutDetails}>{wine.wine.rating}</p>
            <p className={styles.descAboutDetails}>{"("}{wine.wine.avaliations}{")"}</p>
          </div>
          </div>
          <div className={styles.descPrice}>
            <h3 className={styles.descSunPrice}>R$ <p className={styles.descPriceText}>{wine.wine.priceMember}</p></h3>
            <h5 className={styles.noPartnerText}>NÃO SÓCIO R${wine.wine.priceNonMember}/UN.</h5>
          </div>
            <h4 className={styles.boldText}>Comentário do Sommelier</h4>
            <p>{wine.wine.sommelierComment}</p>
          <div className={styles.descFather}>
          <button
               className={styles.buttonAddLess}
              onClick={() => RemoveToCart(wine.wine.id)}
            >-</button> 
          <button
               className={styles.buttonAddLess}
            >{inCart}</button> 
            <button
               className={styles.buttonAddLess}
              onClick={() => AddToCart(wine.wine.id)}
            >+</button> 
          <div>
            <button className={styles.buttonAdd} type='button' onClick={() => AddToCart(wine.wine.id)}>Adicionar</button>
          </div>
          </div>
        </div>
      </div>
    }
    </>
  )
}