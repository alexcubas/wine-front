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
  const {filter} = useContext(ApplicationContext);

  useEffect(() => {
    fetchWines(actualPage)
  }, [actualPage, filter])
  return (
    <>
      <PriceLimit/>
      <div style={{
        display: "grid",
        gridTemplateColumns: 'repeat(3, 1fr)'
      }}>
      <WineCard wines={ wines }/>
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
