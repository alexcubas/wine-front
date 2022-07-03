import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import qs from 'query-string'
import ApplicationContext from '../../context/applicationContext';

export default function usePagination () {
  const router = useRouter()

  const [actualPage, setActualPage] = useState(1)

  useEffect(() => {
    router.push({
      search: qs.stringify({
        page: actualPage
      })
    })
  }, [actualPage])
  return {
    setActualPage,
    actualPage
  }
}