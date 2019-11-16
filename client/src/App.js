import React, { Fragment , useEffect } from "react";
import Posts from "./containers/Posts/Posts";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux";

import {loadUser} from './store/actions/index';
import authReducer from "./store/reducers/authReducer";
import postsReducer from "./store/reducers/postsReducer";
import Navbar from "./containers/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Register from "./containers/Auth/Register";
import Login from "./containers/Auth/Login";
import NewPost from "./components/Post/NewPost";
import PrivateRoute from "./hoc/PrivateRoute";
import FullPost from "./components/Post/FullPost/FullPost";

const rootReducers = combineReducers({
  posts: postsReducer,
  auth: authReducer
});
const middleWare = [thunk];
const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middleWare))
);




const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <section className="container">
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route exact path="/posts/:id" component={FullPost}/>
              <Route exact path="/posts" component={Posts}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <PrivateRoute exact path="/newPost" component={NewPost}/>
              <Redirect to="/"> </Redirect>
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
