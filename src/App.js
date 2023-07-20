import React, { useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Recents from './components/Recents';
import Create from './components/Create';
import View from './components/View';
import Edit from './components/Edit';
import ViewOne from './components/ViewOne';
import Sittings from './components/Sittings';

function App() {
  return (
    <main className="App">
      <BrowserRouter >
        <SideBar />
        <Routes>
          <Route path="/" element={<Recents />} />
          <Route path="/create-one" element={<Create />} />
          <Route path="/view-one" element={<View />} />
          <Route path="/edit-one" element={<Edit />} />
          <Route path="/view-one/:id" element={<ViewOne />} />
          <Route path="/edit-one/:id" element={<Edit />} />
          <Route path="/settings" element={<Sittings />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
