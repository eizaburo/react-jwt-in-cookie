import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Simulate } from "react-dom/test-utils";
import moment from "moment";

const Auth = (props) => {


    const [cookies] = useCookies();


    //Cookieからログイン状態を取得
    const signedIn = cookies.signedIn;
    const expires = cookies.expires;
    const now = moment().format();

    if (moment(expires).isBefore(moment(now))) {
        return <Redirect to="/login" />
    }


    if (signedIn === "true") {
        return props.children;
    } else {
        return <Redirect to="/login" />
    }

}

export default Auth;