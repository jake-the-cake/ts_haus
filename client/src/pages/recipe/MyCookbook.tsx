

const MyCookbook = () => {
    const getData = async () => {
        const data = await (await fetch('http://localhost:4200/cookbook')).json()
        console.log(data)
    }

    getData()

    return (
        <>
            check your console
        </>
    )
}

export default MyCookbook