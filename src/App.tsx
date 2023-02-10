import React from 'react';

import './globalStyles/globalStyles.sass'
import { AppRoutes } from './components/pages/Approute';
import { Header } from './components/header/header';

function App() {
  return (
    <div className="App">
      <Header/>
        <AppRoutes/>
    </div>
  );
}

export default App;
