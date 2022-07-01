import Image from 'next/image'
import { disconnect } from 'node:process'

export default function WineCard({ wines }) {

  const discount = (price, discount) => {
    const disc = `0.${discount}`
    const res = Number(disc) * price
    return res.toFixed(2)
  }
  return(
    <>
    {
      wines?.items?.map((wine) => (
        <div key={wine.id}>
          <div>
            <Image width="200px" height="200px" src={wine.image} alt={wine.name} />
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
      ))
    }
    </>
  )
}
