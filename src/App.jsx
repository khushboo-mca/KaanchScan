import Home from './pages/Home';
import './styles/Navbar.css'
import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transactions from "./pages/Transactions";
import Blocks from "./pages/Blocks";
import Validators from "./pages/Validators";
import Analytics from "./pages/Analytics";
import Token from "./pages/Tokens";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import NotFound from './pages/NotFound';
function App() {
  return (
    <div className="page-wrapper">
      <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/blocks" element={<Blocks />} />
          <Route path="/validators" element={<Validators />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/token" element={<Token />} />
          <Route path="search-not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
    </div>
    

  );
}

export default App;