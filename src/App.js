import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Calendar from './components/Calendar';

function App() {
  const [menuState, setMenuState] = useState(false);

  const navContainerRef = useRef(null);
  const hamburgerIconRef = useRef(null);

  useEffect(() => {
    const handleClick = e => {
      const el = e.target;
      if (navContainerRef.current.contains(el)) {
          console.log('handleClick clicked in nav menu; leave open');
        setMenuState(true);
      } else {
        // Close outside of nav container. Close menu unless clicked on hamburger icon.
        if (!hamburgerIconRef.current.contains(el)) {
          setMenuState(false);
        }
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, [])

  useEffect(() => {

    if (menuState === true) {
      navContainerRef.current.classList.add('show-nav-menu');
      navContainerRef.current.classList.remove('hide-nav-menu');
    } else {
      navContainerRef.current.classList.remove('show-nav-menu');
      navContainerRef.current.classList.add('hide-nav-menu');
    }

  }, [menuState]);

  const toggleMenu = () => {
    console.log('toggleMenu');
    setMenuState(!menuState);
  }

  const checkMenuClick = e => {
    const el = e.target;
    const currentEl = e.currentTarget;
    if (el === currentEl) {
      setMenuState(false);
    }
  }

  return (
    <div className="App">
      <div ref={navContainerRef} onClick={checkMenuClick} className="nav-container">
        
      </div>
      <div className="fixed-header">
        <header>
        Calendar
        </header>
      </div>
      <div className="container app-content">
      <Routes>
        <Route path="/" element={<Calendar />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
