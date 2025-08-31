import React from 'react';
import Header from './components/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Services from './sections/Services';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import { ScrollProvider } from './contexts/ScrollContext';

function App() {
  return (
    <ScrollProvider headerHeight={80}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-[Quicksand] scroll-container">
        <Header />
        <main className="scroll-optimized">
          <Hero />
          <About />
          <Skills />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </ScrollProvider>
  );
}

export default App;
