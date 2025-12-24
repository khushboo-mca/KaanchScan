import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';
//import {BrowserRouter} from 'react-router-dom';


createRoot(document.getElementById('root')).render(
 <ThemeProvider>
  <StrictMode>
    <App />
  </StrictMode>
 </ThemeProvider>

);
