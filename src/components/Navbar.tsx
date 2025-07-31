import logo from '../assets/logo.png';
import { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import gsap from 'gsap';

const translations: Record<string, Record<string, string>> = {
  en: {
    'Water Usage': 'Water Usage',
    Home: 'Home',
    Stats: 'Stats',
    Causes: 'Causes',
    Solutions: 'Solutions',
    Language: 'Language',
    English: 'English',
    Arabic: 'Arabic',
    'Bank Of Info': 'Bank Of Info',
    Game: 'Game',
  },
  ar: {
    'Water Usage': 'استهلاك المياه',
    Home: 'الرئيسية',
    Stats: 'الإحصائيات',
    Causes: 'الأسباب',
    Solutions: 'الحلول',
    Language: 'اللغة',
    English: 'الإنجليزية',
    Arabic: 'العربية',
    'Bank Of Info': 'بنك المعلومات',
    Game: 'اللعبة',
  },
};

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Causes', href: '#causes' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Game', href: '#game' },
  { name: 'Bank Of Info', href: '#bank' },
];

const getInitialLang = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('lang');
    if (stored && (stored === 'en' || stored === 'ar')) return stored;
  }
  return 'en';
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [lang] = useState<string>(getInitialLang());
  const [activeSection, setActiveSection] = useState('home');

  const menuRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const desktopLangMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const t = (key: string) => translations[lang][key] || key;

  useEffect(() => {
    if (desktopLangMenuRef.current) {
      if (menuOpen) {
        gsap.fromTo(
          desktopLangMenuRef.current,
          { opacity: 0, y: -20, pointerEvents: 'none' },
          { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35, ease: 'power2.out' }
        );
      } else {
        gsap.to(desktopLangMenuRef.current, {
          opacity: 0,
          y: -20,
          pointerEvents: 'none',
          duration: 0.25,
          ease: 'power2.in',
        });
      }
    }
  }, [menuOpen]);

  useEffect(() => {
    if (mobileNavRef.current) {
      if (mobileNavOpen) {
        gsap.fromTo(
          mobileNavRef.current,
          { opacity: 0, y: -30, scale: 0.98, pointerEvents: 'none' },
          { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto', duration: 0.4, ease: 'power2.out' }
        );
      } else {
        gsap.to(mobileNavRef.current, {
          opacity: 0,
          y: -30,
          scale: 0.98,
          pointerEvents: 'none',
          duration: 0.25,
          ease: 'power2.in',
        });
      }
    }
  }, [mobileNavOpen]);

  useEffect(() => {
    if (hamburgerRef.current) {
      const icon = hamburgerRef.current.querySelector('svg');
      gsap.fromTo(
        icon,
        { rotation: mobileNavOpen ? -90 : 90, scale: 0.8, opacity: 0 },
        { rotation: 0, scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [mobileNavOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
        setMobileNavOpen(false);
      }
    };

    if (menuOpen || mobileNavOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [menuOpen, mobileNavOpen]);

  useEffect(() => {
    const sectionIds = ['home', 'causes', 'solutions', 'game', 'bank'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="w-[95%] max-w-[1016px] h-20 border border-[#006669]/25 rounded-2xl mx-auto bg-white/80 backdrop-blur-[600px] fixed top-4 left-1/2 -translate-x-1/2 z-50 shadow-xl transition-all duration-300">
      <nav className="flex items-center justify-between px-4 md:px-6 py-3 h-full">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="rounded-full p-2">
            <img src={logo} alt="logo" className="w-10 h-10" />
          </div>
          <span className="text-xl md:text-2xl font-raleway font-extraBold tracking-tight text-primary select-none">
            {t('Water Usage')}
          </span>
        </div>

        {/* Hamburger */}
        <button
          ref={hamburgerRef}
          className="md:hidden flex items-center p-2"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          {mobileNavOpen ? <FaTimes className="w-6 h-6 text-primary" /> : <FaBars className="w-6 h-6 text-primary" />}
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <ul className="flex gap-2 items-center">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById(id);
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`relative group cursor-pointer text-base font-semibold px-2 py-2 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                    ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                  >
                    <span className="z-10 relative font-poppins font-light">{t(link.name)}</span>
                    <span className={`absolute left-0 bottom-1 h-0.5 ${isActive ? 'w-full' : 'w-0'} bg-primary rounded-full transition-all duration-300 group-hover:w-full group-focus-visible:w-full`} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile nav */}
      <div
        ref={mobileNavRef}
        style={{ display: mobileNavOpen ? 'flex' : 'none', opacity: 0 }}
        className="md:hidden bg-white/90 backdrop-blur-sm border border-[#006669]/25 rounded-2xl mx-4 mt-2 shadow-xl flex-col p-4 z-40"
      >
        <ul className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '');
            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById(id);
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth' });
                      setMobileNavOpen(false);
                    }
                  }}
                  className="block w-full px-4 py-2 text-base font-semibold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors duration-200"
                >
                  {t(link.name)}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
