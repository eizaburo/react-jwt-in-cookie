
import Cookies from "js-cookie";

const Action = () => {


    let timer;

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

    const mouseMove = (event) => {
        clearTimeout(timer);
        timer = setTimeout(refresh, 300);
    }

    const refresh = () => {
        if (Cookies.get('signedIn') === "true") {
            refreshTokenAndCookie();
            var in1Minutes = 1 / 1440;
            Cookies.set("signedIn", "true", { expires: in1Minutes })
        }
    }

    let mycanvas = document.getElementById('root');
    mycanvas.addEventListener('mousemove', mouseMove);

    return { mouseMove };
}
export default Action;