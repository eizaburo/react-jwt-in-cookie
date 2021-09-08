import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import moment from "moment";

const Auth = (props) => {

    const history = useHistory();
    const [cookies] = useCookies();

    useEffect(() => {
        setInterval(() => {
            const expires = cookies.expires;
            const now = moment().format();

            if (moment(expires).isBefore(moment(now))) {
                history.push("/login");
            }
        }, 1000)
    }, []);

    let signedIn = cookies.signedIn;

    if (signedIn === "true") {
        return props.children;
    } else {
        return <Redirect to="/login" />
    }

}

export default Auth;