import axios from "axios"
import { ReactNode, useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const MyCookbook = (props: any) => {
    const [recipes, setRecipes] = useState([])
    let { user } = useParams()

    const getData = async () => {
        const { data } = await axios.get(
            `http://localhost:4200/cookbook/user/${user}}`,
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
            const ret = await getData()
            setRecipes(await ret)
        })()
    },[])

    return (
        <>
            <div>
           {recipes.length !== 0 ? recipes.map((item:{name:string, author:string},index:number): ReactNode => {
                return <p key={index}>{item.name} -- by {item.author}</p>
            }) : <p>No Recipes Found For User.</p>}
            </div>
        </>
    )
}