import React from 'react';

import './globalStyles/globalStyles.sass'
import { AppRoutes } from './components/pages/Approute';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <AppRoutes/>
      <Footer/>
    </div>
  );
}

export default App;
