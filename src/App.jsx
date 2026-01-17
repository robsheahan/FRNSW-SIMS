import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HoseCheck from './pages/HoseCheck';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/hose-check" element={<HoseCheck />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
