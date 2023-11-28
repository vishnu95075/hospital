import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hospital from './Components/Hospital/Hospital';
import Test from './Components/Hospital/Test';
import Bed from './Components/Bed/Bed';
import './Animation.scss';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hospital />} />
          <Route path='/hospital' element={<Test />} />
          <Route path='/bed' element={<Bed />} />
          {/* <Route path='/temp' element={<EditableTableCell />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;