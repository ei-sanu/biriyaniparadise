import { motion } from 'framer-motion';
import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { recipes } from '../../data/recipes';

interface HeaderProps {
  toggleTheme: () => void;
  currentTheme: 'light' | 'dark';
}

interface SearchResult {
  id: string;
  name: string;
}

const Header = ({ toggleTheme, currentTheme }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowRecommendations(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setSearchQuery('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
      const filtered = recipes
        .filter(recipe =>
          recipe.name.toLowerCase().includes(value.toLowerCase())
        )
        .map(recipe => ({
          id: recipe.id,
          name: recipe.name
        }));
      setSearchResults(filtered);
      setShowRecommendations(true);
    } else {
      setSearchResults([]);
      setShowRecommendations(false);
    }
  };

  const handleRecommendationClick = (recipeId: string) => {
    setShowRecommendations(false);
    setSearchQuery('');
    navigate(`/recipe/${recipeId}`);
  };

  const searchFormContent = (
    <div ref={searchRef} className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={`pl-10 pr-4 py-2 rounded-full text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 w-48 ${isScrolled
            ? 'border border-gray-300 dark:border-gray-700 dark:bg-gray-800'
            : 'bg-white/10 border-transparent backdrop-blur-sm text-white placeholder-white/70'
            }`}
        />
        <Search className={`absolute left-3 top-2.5 w-4 h-4 ${isScrolled ? 'text-gray-400' : 'text-white/70'
          }`} />
      </form>

      {showRecommendations && searchResults.length > 0 && (
        <div className="absolute mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <ul className="py-1">
            {searchResults.map((result) => (
              <li key={result.id}>
                <button
                  onClick={() => handleRecommendationClick(result.id)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {result.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md py-2'
          : 'absolute bg-transparent py-6'
        }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <motion.div
            whileHover={{ rotate: 10 }}
            className={`${isScrolled
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-white'
              } mr-2 transition-colors duration-300`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
              <path d="M9 2v20" />
              <path d="M15 15v5" />
              <path d="M18 15v5" />
              <path d="M15 2v10c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V2" />
            </svg>
          </motion.div>
          <h1 className="text-xl md:text-2xl font-display font-bold">
            <span className={`${isScrolled
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-white'
              } transition-colors duration-300`}>
              Biriyani
            </span>
            <span className={`${isScrolled
              ? 'text-gray-800 dark:text-white'
              : 'text-white'
              } transition-colors duration-300`}>
              {' '}Paradise
            </span>
          </h1>
        </Link>

        {/* Desktop Navigation with transparent background */}
        <nav className="hidden md:flex items-center space-x-8">
          {['Home', 'About', 'Contact', 'Recipes'].map((item) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className={`font-medium transition-colors duration-300 ${isScrolled
                ? 'text-gray-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400'
                : 'text-white hover:text-white/80'
                }`}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Search and Theme Toggle with transparent background */}
        <div className="hidden md:flex items-center space-x-4">
          {searchFormContent}

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-300 ${isScrolled
              ? 'hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
              : 'hover:bg-white/10'
              }`}
            aria-label="Toggle theme"
          >
            {currentTheme === 'dark' ? (
              <Sun className={`w-5 h-5 ${!isScrolled && 'text-white'}`} />
            ) : (
              <Moon className={`w-5 h-5 ${!isScrolled && 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu Button with transparent background */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-300 ${isScrolled
              ? 'hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
              : 'hover:bg-white/10'
              }`}
            aria-label="Toggle theme"
          >
            {currentTheme === 'dark' ? (
              <Sun className={isScrolled ? 'w-5 h-5' : 'w-5 h-5 text-white'} />
            ) : (
              <Moon className={isScrolled ? 'w-5 h-5' : 'w-5 h-5 text-white'} />
            )}
          </button>

          <button
            onClick={toggleMenu}
            className={`p-2 rounded-md transition-colors duration-300 ${isScrolled
              ? 'hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
              : 'hover:bg-white/10'
              }`}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className={isScrolled ? 'w-6 h-6' : 'w-6 h-6 text-white'} />
            ) : (
              <Menu className={isScrolled ? 'w-6 h-6' : 'w-6 h-6 text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu with semi-transparent background */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg"
        >
          <div className="container-custom py-4 flex flex-col space-y-4">
            {searchFormContent}

            {['Home', 'About', 'Contact', 'Recipes'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="py-2 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
