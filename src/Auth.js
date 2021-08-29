import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";


const Auth = (props) => {

    const [cookies] = useCookies();
    //Cookieからログイン状態を取得
    const signedIn = cookies.signedIn;

    if (signedIn === "true") {
        return props.children;
    } else {
        return <Redirect to="/login" />
    }
}

export default Auth;