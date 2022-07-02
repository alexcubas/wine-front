import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState } from 'react';
import ApplicationContext from '../context/applicationContext';

export default function WineCard({ wines }) {
  const [quantity, setQuantity] = useState(0);
  const {setWineById, winesG, setCounterCart} = useContext(ApplicationContext);

  const discount = (price, discount) => {
    const disc = `0.${discount}`
    const res = Number(disc) * price
    return res.toFixed(2)
  }

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
          <Link href={`/wine/${wine.id}`}>
            <a onClick={() => findById(wine.id)}>
            <div>
          <div>
            <Image width="150" height="150" src={wine.image} alt={wine.name} />
          </div>
          <h2>
            {wine.name}
          </h2>
          <div>
            <p>
            {wine.price}
            </p>
            <p>
            {wine.discount}% OFF
            </p>
          </div>
          <h3>
            SÓCIO WINE R${discount(wine.price, wine.discount)}
          </h3>
          <h4>
            NÃO SÓCIO R${wine.price}
          </h4>
            </div>
            </a>
          </Link>
          <button type='button' onClick={() => AddToCart(wine.id)}>
            ADICIONAR
          </button>
        </div>
      ))
    }
    </>
  )
}
