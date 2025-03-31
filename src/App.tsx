// App.tsx
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './Components/MainLayout';
import Home from './Pages/Home';
import About from './Pages/About';
import Test from './Pages/Test'
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}> {/* Comments need the curly braces. App.tsx is now just rendering and setting our routes */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path= "test" element={<Test />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;