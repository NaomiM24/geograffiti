import "./App.css";
import CanvasTest from "./components/CanvasTest";
import NavBar from "./components/NavBar";
import { Router } from "@reach/router";
import Map from "./components/Map";
import React, { Component } from "react";
import fire from "./config/Fire";
import Login from "./components/Login";
import Header from "./components/Header";
import Signup from "./components/Signup";
import CanvasList from "./components/CanvasList";
import CanvasDisplayer from "./components/CanvasDisplayer";
import RedirectLogin from "./components/RedirectLogin";
import ErrorPage from "./components/ErrorPage";

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user, isLoading: false });
      } else {
        this.setState({ user: null, isLoading: false });
      }
    });
  }
  render() {
    const { user, isLoading } = this.state;
    if (isLoading) return null;
    return (
      <div className="App">
        {!user ? (
          <Router>
            <Login path="/" />
            <Signup path="/signup" />
            <RedirectLogin default />
          </Router>
        ) : (
          <main className="App-main">
            <Header className="App-header" uid={user.uid} />
            <NavBar className="App-navbar" />
            <Router className="App-router">
              <CanvasTest
                path="/canvas"
                className="App-router"
                uid={user.uid}
              />
              <Map path="/" className="App-router" />
              <CanvasList path="/view" className="App-router" uid={user.uid} />
              <CanvasDisplayer path="/view/:id" />
              <ErrorPage path="/*" />
            </Router>
          </main>
        )}
      </div>
    );
  }
}

export default App;
