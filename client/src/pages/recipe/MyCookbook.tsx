

const MyCookbook = () => {
    const getData = async () => {
        const data = await (await fetch('https://haus-app-server.herokuapp.com/cookbook')).json()
    }

    getData()

    return (
        <>
            check your console
        </>
    )
}

export default MyCookbook