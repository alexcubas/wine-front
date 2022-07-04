import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react';
import ApplicationContext from '../context/applicationContext';
import styles from '../styles/CardWine.module.css'

export default function WineCard({ wines }) {
  const {setWineById, winesG, setCounterCart} = useContext(ApplicationContext);

  const findById = (id) => {
    const correctId = wines?.items?.filter((wine) => wine.id === id )
    setWineById(correctId)
  }

  function AddToCart(id) {
    const cartCounter = JSON.parse(localStorage.getItem('prods'))
    const existsWine = winesG.items.find((wine) => wine.id === id)
    
    !cartCounter ? localStorage.setItem('prods', JSON.stringify([existsWine]))
    : localStorage.setItem('prods', JSON.stringify([...cartCounter, existsWine]))

    setCounterCart(cartCounter ? cartCounter.length + 1 : 1)
  }
  return(
    <>
    {
      wines?.items?.map((wine) => (
        <div key={wine.id}>
          <div id={styles.maxW} className={styles.cardFather} style={{width: "16rem", height: "25rem"}}>
            <Link href={`/wine/${wine.id}`}>
              <a onClick={() => findById(wine.id)}>
                <div className={styles.cardImage}>
                  <Image className="card-img-top" width="150" height="150" src={wine.image} alt={wine.name} />
                </div>
                <div className="card-body">
                    <h6>
                      {wine.name}
                    </h6>
                  <div className={styles.cardSun}>
                    <p className={styles.textrisc}>
                      R$ {wine.price}
                    </p>
                    <p className={styles.textColor}>
                      {wine.discount}% OFF
                    </p>
                  </div>
                <p className={styles.cardSun}>
                  SÓCIO WINE <span className={styles.textpink}>R$<span className={styles.textBig}>{wine.priceMember}</span></span>
                </p>
                <p className={styles.cardSunNoPartner}>
                  NÃO SÓCIO R${wine.priceNonMember}
                </p>
                </div>
              </a>
            </Link>
          </div>
            <button className={styles.buttonAdd} type='button' onClick={() => AddToCart(wine.id)}>
              ADICIONAR
            </button>
        </div>
      ))
    }
    </>
  )
}
