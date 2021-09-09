import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Private = () => {

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

        const mouseMove = (event) => {
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
                    method: "post",
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

            //処理
            if (Cookies.get('signedIn') === "true") {
                refreshTokenAndCookie();
                var in1Minutes = 1 / 1440;
                Cookies.set("signedIn", "true", { expires: in1Minutes })
            }

        }


        let mycanvas = document.getElementById('root');
        mycanvas.addEventListener('mousemove', mouseMove);
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