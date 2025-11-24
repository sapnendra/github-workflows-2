import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AdminProvider } from './contexts/AdminContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

const App = () => {
  return (
    <ThemeProvider>
      <AdminProvider>
        <Router>
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/*"
              element={
                <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
                  <Navbar />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </Router>
      </AdminProvider>
    </ThemeProvider>
  );
};

export default App;
