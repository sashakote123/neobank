import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);

