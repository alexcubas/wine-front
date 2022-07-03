import styles from '../styles/Home.module.css'
import Image from 'next/image'

import useWines from '../components/hooks/useWines'
import { useContext, useEffect } from 'react'
import usePagination from '../components/hooks/usePagination'
import PriceLimit from '../components/priceLimit'
import WineCard from '../components/WineCard'
import ApplicationContext from '../context/applicationContext'

export default function Home() {
  const { wines, fetchWines } = useWines(9)
  const { actualPage, setActualPage } = usePagination()
  const {filter, setCounterCart} = useContext(ApplicationContext);
  
  useEffect(() => {
    const cartCounter = JSON.parse(localStorage.getItem('prods'))
    setCounterCart(cartCounter ? cartCounter.length : 0)

    fetchWines(actualPage)
  }, [actualPage, filter])
  return (
    <>
      <div className={styles.cardGlobal}>
        <PriceLimit/>
        <div className={styles.cardFather}>
        <WineCard wines={ wines }/>
        </div>
      </div>
          {
            Array(wines?.totalPages).fill('').map((_, index) => {
              return <button key={index} onClick={() => setActualPage(index + 1)}>
                { index + 1 }
              </button>
            })
          }
    </>
  )
}
