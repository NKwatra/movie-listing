import { Layout } from "antd";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Router>
        <Header>
          <Navbar />
        </Header>
        <Content>
          <Switch>
            <Route path="/movies">
              <span>Movies</span>
            </Route>
            <Route path="/tv-shows">
              <span>TV Shows</span>
            </Route>
            <Route path="/">
              <span>Home</span>
            </Route>
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
