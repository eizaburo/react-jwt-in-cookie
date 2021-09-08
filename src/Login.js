import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import moment from "moment";
const Login = () => {

    const idRef = useRef(null);
    const pwRef = useRef(null);

    const history = useHistory();
    const [cookies, setCookie] = useCookies();

    const login = () => {
        // alert(`id=${idRef.current.value},pw=${pwRef.current.value}`);
        const login_api_url = "http://localhost:3001/login";
        fetch(login_api_url, {
            method: "post",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: encodeURI(`username=${idRef.current.value}&password=${pwRef.current.value}`),
        })
            .then((response) => {
                response.json()
                    .then((json) => {
                        if (json.message === "success.") {
                            setCookie("signedIn", "true", { maxAge: 60 });
                            const time = moment().add(1, 'm').format();
                            setCookie("expires", time, { maxAge: 60 });
                            history.push("/private");
                        } else {
                            alert(json.message);
                        }
                    })
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    return (
        <>
            <h1>Login</h1>
            ID:<input type="text" ref={idRef} /><br />
            PW:<input type="text" ref={pwRef} /><br />
            <button onClick={login}>ログイン</button>
        </>
    );
}

export default Login;