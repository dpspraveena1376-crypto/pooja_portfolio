import { createRoot } from 'react-dom/client';
import Portfolio from './Portfolio.jsx';
import './styles/base.css';
import './styles/interactions.css';
import './styles/components.css';
import './styles/responsive.css';

createRoot(document.getElementById('root')).render(<Portfolio />);
