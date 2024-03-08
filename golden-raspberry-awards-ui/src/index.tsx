/** React imports */
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes,  Route} from 'react-router-dom';

/** Custom imports */
import Header from './layout/Header/Header';
import Sidebar from './layout/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import List from './components/List/List';

/** CSS imports */
import './index.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <PrimeReactProvider>
    <div className="body">
      <BrowserRouter>
        <Header />
        <div className="container">
          <Sidebar />
          <div className="content">
          <Routes>
            <Route path={'/'} element={<Dashboard />} />
            <Route path={'/list'} element={<List />} />
          </Routes>
          </div>
        </div>
    </BrowserRouter>
    </div>
  </PrimeReactProvider>
);
