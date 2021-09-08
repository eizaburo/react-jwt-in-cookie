import { useHistory } from "react-router-dom";

const Home2 = () => {

    const history = useHistory();
    const onClick = () => {
        history.push("/private");
    }
    return (
        <>
            <h1>Home2です。</h1>
            <button onClick={onClick}>private</button>
        </>
    )
}

export default Home2;