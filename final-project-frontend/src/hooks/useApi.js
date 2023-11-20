import {useEffect,useState} from 'react'


const useApi = (url) => {

const [games, setGames] = useState([])


     useEffect(() => {
       fetch(url)
         .then((res) => res.json())
         .then((result) => setGames(result));
     }, [url]);


  return games
}

export default useApi