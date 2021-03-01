import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import Login from "@/containers/login";
// 设置语言
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";

import registerServiceWorker from "./registerServiceWorker";
import reducer from "./reducers";
import Loadable from "@/components/Loadable";
const App = Loadable({
  loader: () => import("./App")
});

// redux 注入操作
const middleware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

ReactDOM.render(
  <LocaleProvider locale={zh_CN}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </Provider>
  </LocaleProvider>,
  document.getElementById("root")
);

registerServiceWorker();
