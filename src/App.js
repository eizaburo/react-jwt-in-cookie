import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

import Home from "./Home";
import Login from "./Login";
import Private from "./Private";
import Auth from "./Auth";

const App = () => {

  // const [cookies, setCookie] = useCookies();

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      // Cookies.set("signedIn", "false");
      if (window.performance.navigation.type == 1) {
        //reload（何もしない）
      } else {
        document.cookie = "signedIn=false";
      }
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Auth>
            <Route path="/private" exact component={Private} />
          </Auth>
          <Route render={() => (<h1>Page not found.</h1>)} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
