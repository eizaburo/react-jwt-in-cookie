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

    const onClickHome2 = () => {
        history.push("/Home2");
    }

    useEffect(() => {
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
        getPrivateContent();
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

            <button onClick={onClickHome2}>HOME２へ</button>
        </>
    );
}

export default Private;