import 'swiper/css/bundle';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Attraction from './pages/Attraction';
import Homepage from './pages/Homepage';
import Hotel from './pages/Hotel';
import Restaurant from './pages/Restaurant';
import useStore from './store/useStore';

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/attraction" component={Attraction} />
      <Route exact path="/restaurant" component={Restaurant} />
      <Route exact path="/hotel" component={Hotel} />
      <Route path="*" component={Homepage} />
    </Switch>
    <Footer />
  </BrowserRouter>
);
export default App;
