import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Attraction from "./pages/Attraction";
import Restaurant from "./pages/Restaurant";
import Hotel from "./pages/Hotel";
import Header from "./components/Header";
import Footer from "./components/Footer";
import useStore from "./store/useStore";
import "swiper/css/bundle";

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/attraction" component={Attraction} />
      <Route exact path="/restaurant" component={Restaurant} />
      <Route exact path="/hotel" component={Hotel} />
      <Route path="*" component={Homepage} />
    </Switch>
    <Footer />
  </BrowserRouter>
);
export default App;
