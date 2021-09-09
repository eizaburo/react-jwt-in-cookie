import { Route, Redirect } from "react-router-dom";
// import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useHistory } from 'react-router';
import Cookies from "js-cookie";

const Auth = (props) => {

    const history = useHistory();

    let interval = null;

    const stop = () => {
        clearInterval(interval);
    }

    useEffect(() => {
        if (Cookies.get('signedIn') === "true") {

            interval = setInterval(() => {

                if (Cookies.get('signedIn') !== "true") {
                    stop(interval);
                    history.push("/forbidden");
                }

            }, 1000)

        }

    }, []);




    //Cookieからログイン状態を取得
    const signedIn = Cookies.get('signedIn');

    console.log(signedIn);

    if (signedIn === "true") {
        return <Route {...props} />;
    } else {
        return <Redirect to="/login" />;
    }
}

export default Auth;