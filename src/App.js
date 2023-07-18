import React, { useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Recents from './components/Recents';
import Create from './components/Create';
import View from './components/View';
import Edit from './components/Edit';
import ViewOne from './components/ViewOne';

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
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
