import { Layout } from "antd";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Movies from "./routes/Movies";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

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
            <Route path="/:media_type/:id">
              <Detail />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/tv-shows">
              <span>TV Shows</span>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
