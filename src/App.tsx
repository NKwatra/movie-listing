import { Layout } from "antd";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Movies from "./routes/Movies";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Shows from "./routes/TVshows";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Router>
        <Header style={{ position: "fixed", width: "100%", zIndex: 1 }}>
          <Navbar />
        </Header>
        <Content style={{ paddingTop: 64 }}>
          <Switch>
            <Route path="/:media_type/:id">
              <Detail />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/tv-shows">
              <Shows />
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
