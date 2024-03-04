import React from 'react';
import { MainContainer } from './Components/MainContainer/MainContainer';
import { MapLocationProvider } from './Contexts/MapLocationProvider';

function App() {
  return (
    <>
      <MapLocationProvider>
        <MainContainer />
      </MapLocationProvider>
    </>
  );
}

export default App;
