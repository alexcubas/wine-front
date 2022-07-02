import { useContext, useState } from "react"
import ApplicationContext from "../../context/applicationContext";

interface IWine {
  id: number
  image: string
  name: string
  price: number
  discount: number
  priceMember: number
  priceNonMember: number
  type: string
  classification: string
  size: number
}

interface IProduct {
  page: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
  items: IWine[]
}

export default function useWines (pageLimit: number) {
  const [wines, setWines] = useState<IProduct>()
  const {filter, setWinesG} = useContext(ApplicationContext);
  
  async function fetchWines (page: number) {
    const res = await fetch(
      `https://wine-back-test.herokuapp.com/products?page=${page}&limit=${pageLimit}&filter=${filter}`
    )
    const respJson = await res.json()
    setWines(respJson)
    setWinesG(respJson)
  }

  return {
    wines,
    fetchWines
  }
}