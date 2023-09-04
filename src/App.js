import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Hamburger from './components/Hamburger';
import Calendar from './components/Calendar';
import CalendarPractice from './components/Lab';

function App() {
  const [menuState, setMenuState] = useState(false);
  const [hamburgerClass, setHamburgerClass] = useState('hamburger-nav');

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
        if (!hamburgerIconRef?.current?.contains(el)) {
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

  const hamburgerClick = () => {
    console.log('hamburger clicked', hamburgerClass);
    if (hamburgerClass === 'hamburger-nav') {
      setHamburgerClass('hamburger-nav hamburger-on');
    } else {
      setHamburgerClass('hamburger-nav');
    }
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    console.log('toggleMenu', !menuState);
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
        <nav>
          <ul>
            <li><Link to="/" onClick={toggleMenu}>Calendar</Link></li>
            <li><Link to="/lab" onClick={toggleMenu}>Practice</Link></li>
          </ul>
        </nav>
      </div>
      <div className="fixed-header">
        <header>
          <Hamburger onClick={toggleMenu} />
          Calendar
        </header>
      </div>
      <div className="container app-content">
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/lab" element={<CalendarPractice />} />
        </Routes>
      </div>
    </div>
  );

}

export default App;
