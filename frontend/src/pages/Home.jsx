import useRefreshToken from '../hooks/useRefreshToken'

const Home = () => {
    const refresh = useRefreshToken()

    return (
        <div>
            <button onClick={() => console.log(refresh())}>
                Refresh token
            </button>
        </div>
    )
}

export default Home
