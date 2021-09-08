import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Home2 from "./Home2";
import Login from "./Login";
import Private from "./Private";
import Auth from "./Auth";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Auth>
            <Route path="/private" exact component={Private} />
            <Route path="/home2" exact component={Home2} />
          </Auth>
          <Route render={() => (<h1>Page not found.</h1>)} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
