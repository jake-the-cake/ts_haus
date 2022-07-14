import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const MyCookbook = (props: any) => {
    const [recipes, setRecipes]: any = useState({})
    let { slug } = useParams()

    const getData = async () => {
        const { data } = await axios.get(
            `http://localhost:4200/cookbook/${slug}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            }
        )
        return data
    }
    
    useEffect(() => {
        const data = (async () => {
            const [ret] = await getData()
            setRecipes(ret)
        })()
    },[])

    return (
        <>
           {recipes.cat}
        </>
    )
}

export default MyCookbook