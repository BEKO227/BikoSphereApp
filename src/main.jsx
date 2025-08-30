import { createRoot } from 'react-dom/client'
import './index.css'
import 'flowbite'
import App from './App.jsx'
import 'flowbite/dist/flowbite.min.css';
import 'flowbite/dist/flowbite.min.js';

createRoot(document.getElementById('root')).render(
    <App />
)
