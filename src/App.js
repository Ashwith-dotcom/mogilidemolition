import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import TrustedBy from './components/TrustedBy';
import Footer from './components/Footer';
import { Hammer, Drill, CircleDot } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <TrustedBy />
      <Footer />
    </div>
  );
}

export default App;