import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav>
      <div>
        <Image src="/images/blacka.png" width="120" height="40" alt="Logo Wine" />
      </div>
      <ul>
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
    </nav>
  )
}