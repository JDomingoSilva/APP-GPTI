import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { DataContextProvider } from './contexts/DataContext';
import RouteList from './routes';

export default function App() {
  return (
    <Router>
      <DataContextProvider>
        <RouteList />
      </DataContextProvider>
    </Router>
  );
}