import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home              from './pages/Home/Home';
import About             from './pages/About/About';
import Properties        from './pages/Properties/Properties';
import Residential       from './pages/Residential/Residential';
import Commercial        from './pages/Commercial/Commercial';
import PropertyDetails   from './pages/PropertyDetails/PropertyDetails';
import Buy               from './pages/Buy/Buy';
import Rent              from './pages/Rent/Rent';
import Sell              from './pages/Sell/Sell';
import Services          from './pages/Services/Services';
import Agents            from './pages/Agents/Agents';
import Contact           from './pages/Contact/Contact';
import PrivacyPolicy     from './pages/PrivacyPolicy/PrivacyPolicy';
import Terms             from './pages/Terms/Terms';
import NotFound          from './pages/NotFound/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <PropertyProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/"                    element={<Home />} />
              <Route path="/about"               element={<About />} />
              <Route path="/properties"          element={<Properties />} />
              <Route path="/properties/residential" element={<Residential />} />
              <Route path="/properties/commercial"  element={<Commercial />} />
              <Route path="/properties/:id"      element={<PropertyDetails />} />
              <Route path="/buy"                 element={<Buy />} />
              <Route path="/rent"                element={<Rent />} />
              <Route path="/sell"                element={<Sell />} />
              <Route path="/services"            element={<Services />} />
              <Route path="/agents"              element={<Agents />} />
              <Route path="/contact"             element={<Contact />} />
              <Route path="/privacy-policy"      element={<PrivacyPolicy />} />
              <Route path="/terms"               element={<Terms />} />
              <Route path="*"                    element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </PropertyProvider>
    </BrowserRouter>
  );
}
