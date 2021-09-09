import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Action from "./Action";

const Private = () => {
    const { mouseMove } = Action();
    const history = useHistory();
    // const [cookies, setCookie] = useCookies();
    const [content, setContent] = useState("loading...");

    const logout = () => {
        Cookies.set("signedIn", "false");
        history.push("/login");
    }

    const getHttpOnlyCookie = () => {
        alert(Cookies.get('token'));
    }

    useEffect(() => {
        //private apiから情報を取得
        const content_api_url = "http://localhost:3001/private";
        const getPrivateContent = async () => {
            const res = await fetch(content_api_url, {
                mode: "cors",
                credentials: "include"
            });
            const json = await res.json();
            const content = json.message;
            setContent(content);
        }

        //実行
        getPrivateContent();

        mouseMove();
    }, []);

    return (
        <>
            <h1>Private</h1>
            <button onClick={logout}>ログアウト</button>
            <hr />
            <p>Private Message</p>
            <p>{content}</p>
            <hr />
            <button onClick={getHttpOnlyCookie}>httpOnly Cookie取得</button>
        </>
    );
}

export default Private;