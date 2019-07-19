import React, { Fragment, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import Users from "./components/Users/Users";
import User from "./components/Users/User";
import Search from "./components/Users/Search";
import Alert from "./components/Layout/Alert";
import About from "./components/Pages/About";
import GithubState from "./context/github/GithubState";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const searchUser = async text => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=$
      {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
        process.env.REACT_APP_GITHUB_CLIENT_SECRET
      }`);

    setUsers(res.data.items);
    setLoading(false);
    setAlert(null);
  };

  const setShowAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 1500);
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  //Get a single Github users.
  const getUser = async username => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
      process.env.REACT_APP_GITHUB_CLIENT_SECRET
    }`);
    setUser(res.data);
  };

  const getUserRepos = async username => {
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
      process.env.REACT_APP_GITHUB_CLIENT_SECRET
    }`);
    setRepos(res.data);
    setLoading(false);
  };

  return (
    <GithubState>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Alert alert={alert} />
                    <Search
                      searchUser={searchUser}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={setShowAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    user={user}
                    loading={loading}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </GithubState>
  );
};

export default App;
