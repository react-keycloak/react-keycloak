import { useState, useEffect } from 'react'
import axios from 'axios'
import { useKeycloak } from '@react-keycloak/web'

export const useAxios = (baseURL) => {
  const [keycloak, initialized] = useKeycloak()
  const [axiosInstance, setAxiosInstance] = useState({})

  useEffect(() => {
    const instance = axios.create({
      baseURL,
      headers: {
        Authorization: initialized ? `Bearer ${keycloak.token}` : undefined,
      },
    })

    setAxiosInstance({ instance })

    return () => {
      setAxiosInstance({})
    }
  }, [baseURL, initialized, keycloak, keycloak.token])

  return axiosInstance.instance
}
