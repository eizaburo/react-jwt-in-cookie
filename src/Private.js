import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

const Private = () => {

    const history = useHistory();
    const [cookies, setCookie] = useCookies();
    const [content, setContent] = useState("loading...");

    const logout = () => {
        setCookie("signedIn", "false");
        history.push("/login");
    }

    const getHttpOnlyCookie = () => {
        alert(cookies.token);
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

        //token update
        const refresh_api_url = "http://localhost:3001/refresh";
        const refreshTokenAndCookie = async () => {
            const res = await fetch(refresh_api_url, {
                method:"post",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: encodeURI(``),
            });
            const json = await res.json();
            const message = json.message;
            console.log(message);
        }

        //繰り返し処理
        setInterval(() => {
            if (cookies.signedIn === "true") {
                refreshTokenAndCookie();
                setCookie("signedIn", "true", { maxAge: 300 });
            }
        }, 1000 * 60);
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