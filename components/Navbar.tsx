import Image from "next/image"
import Link from "next/link"

import styles from '../styles/Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src="/images/blacka.png" width="120" height="40" alt="Logo Wine" />
      </div>
      <ul className={styles.link_items}>
        <li>
          Clube
        </li>
        <li>
          <Link href="/"><a>Loja</a></Link>
        </li>
        <li>
          Produtores
        </li>
        <li>
          Ofertas
        </li>
        <li>
          Eventos
        </li>
      </ul>
      <div className={styles.logo}>
        <Image src="/images/Busca.png" width="50" height="50" alt="logo busca" />
      </div>
      <div className={styles.logo}>
        <Image src="/images/conta.png" width="50" height="50" alt="logo conta" />
      </div>
      <div className={styles.logo}>
        <Image src="/images/winebox.png" width="50" height="50" alt="logo carrinho de compras" />
      </div>
    </nav>
  )
}