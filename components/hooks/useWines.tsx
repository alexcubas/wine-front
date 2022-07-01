import { useEffect } from "react";
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
  const {filter} = useContext(ApplicationContext);

  function fetchWines (page: number) {
    fetch(
      `https://wine-back-test.herokuapp.com/products?page=${page}&limit=${pageLimit}&filter=${filter}`
    )
      .then(res => res.json())
      .then(data => setWines(data))
      .catch(window.alert)
  }

  return {
    wines,
    fetchWines
  }
}