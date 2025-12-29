// src/App.tsx
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import TourDetail from "./pages/TourDetail";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/tour/:id" component={TourDetail} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
