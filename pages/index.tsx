import useWines from '../components/hooks/useWines'
import { useContext, useEffect } from 'react'
import usePagination from '../components/hooks/usePagination'
import PriceLimit from '../components/priceLimit'
import WineCard from '../components/WineCard'
import ApplicationContext from '../context/applicationContext'
import styles from '../styles/Home.module.css'

export default function Home() {
  const { wines, fetchWines } = useWines(9)
  const { actualPage, setActualPage } = usePagination()
  const {filter, setCounterCart, byName} = useContext(ApplicationContext);
  
  useEffect(() => {
    const cartCounter = JSON.parse(localStorage.getItem('prods'))
    setCounterCart(cartCounter ? cartCounter.length : 0)
    fetchWines(actualPage)
  }, [actualPage, filter, byName])
  return (
    <>
      <p id={styles.maxW} className={styles.prodFounded}>{ wines?.totalItems } produtos encontrados</p>
      <div className={styles.cardGlobal}>
        <PriceLimit/>
        <div className={styles.cardFather}>
          <WineCard wines={ wines }/>
        </div>
      </div>
      <div className={styles.buttonChangePageFather}>
          {
            Array(wines?.totalPages).fill('').map((_, index) => {
              return <button data-testid="buttonChangePage" className={styles.buttonChangePage} key={index} onClick={() => setActualPage(index + 1)}>
                { index + 1 }
              </button>
            })
          }
      </div>
    </>
  )
}
