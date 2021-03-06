//Utilité d'un hook personnalisé : création d'un code réutilisable dans toute l'application

import { useState, useEffect } from 'react'

//récupère les données d'une API
export function useFetch(url) {
    const [data, setData] = useState({})
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!url) return
        
        fetch(url)
            .then((response) => response.json())//convertit la réponse en données JSON
            .then((data) => {//traite les données reçues
                setData(data)
                
            })
            .catch((error) => {
                console.log(error)
                setError(true)
            })
    }, [url])//déclenche l'appel de useEffect si l'url change

    return {data, error}
}

//Exemple n°2 de récupération de donnée API
export function useFetch2(url) {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!url) return
        
        setLoading(true)
     
        //déclaration de la fonction fetchData
        async function fetchData() {
            try {
                const response = await fetch(url)
                const data = await response.json()
                setData(data)
            } catch (err) {
                console.log(err)
                setError(true)
            } finally {//traitement après l'appel
                setLoading(false)
                
                //exemple avec setTimeout pour confirmer l'affichage du loader en simulant un délai de chargement
                //        setTimeout(() => {setLoading(false)}, 100)
            }
        }
    
        fetchData()//appel de la fonction fetchData
    }, [url])
    
    return { isLoading, data, error }
}
