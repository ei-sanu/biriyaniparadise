import { motion, useInView } from 'framer-motion';
import { Search } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Recipe, recipes } from '../../data/recipes';

interface RecipeGridProps {
  searchQuery?: string;
}

const RecipeGrid = ({ searchQuery = '' }: RecipeGridProps) => {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [localSearch, setLocalSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const lastScrollY = useRef(0);

  // Optimized scroll direction detection with throttling
  const updateScrollDirection = useCallback((latest: number) => {
    if (!lastScrollY.current) {
      lastScrollY.current = latest;
      return;
    }

    const difference = latest - lastScrollY.current;
    // Only update direction if scroll difference is significant
    if (Math.abs(difference) > 10) {
      const direction = difference > 0 ? 'down' : 'up';
      setScrollDirection(direction);
      lastScrollY.current = latest;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        updateScrollDirection(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateScrollDirection]);

  // Optimized variants with reduced animation complexity
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15 // Reduced delay
      }
    }
  };

  const groupVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05 // Reduced delay
      }
    }
  };

  const getCardVariants = (direction: 'up' | 'down') => ({
    hidden: {
      x: direction === 'down' ? 50 : -50, // Reduced distance
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween", // Changed from spring to tween
        duration: 0.3, // Shorter duration
        ease: "easeOut"
      }
    }
  });

  // Helper function to chunk recipes into groups of 3
  const getRecipeGroups = (recipes: Recipe[]) => {
    const groups: Recipe[][] = [];
    for (let i = 0; i < recipes.length; i += 3) {
      groups.push(recipes.slice(i, i + 3));
    }
    return groups;
  };

  useEffect(() => {
    let filtered = recipes;

    // Apply external search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.region.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query)
      );
    }

    // Apply local search
    if (localSearch) {
      const query = localSearch.toLowerCase();
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.region.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
      );
    }

    // Apply difficulty filter
    if (selectedDifficulty) {
      filtered = filtered.filter(recipe => recipe.difficulty === selectedDifficulty);
    }

    setFilteredRecipes(filtered);
  }, [searchQuery, localSearch, selectedDifficulty]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(difficulty === selectedDifficulty ? '' : difficulty);
  };

  return (
    <div className="will-change-transform">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="relative w-full md:w-auto md:flex-grow max-w-xl">
            <input
              type="text"
              placeholder="Search recipes, ingredients..."
              value={localSearch}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 rounded-full text-sm border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-md"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          <div className={`flex gap-2 ${showFilters ? 'flex' : 'hidden md:flex'}`}>
            <button
              onClick={() => handleDifficultyChange('Easy')}
              className={`px-3 py-1 text-sm rounded-full ${selectedDifficulty === 'Easy'
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}
            >
              Easy
            </button>
            <button
              onClick={() => handleDifficultyChange('Medium')}
              className={`px-3 py-1 text-sm rounded-full ${selectedDifficulty === 'Medium'
                ? 'bg-yellow-600 text-white'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}
            >
              Medium
            </button>
            <button
              onClick={() => handleDifficultyChange('Hard')}
              className={`px-3 py-1 text-sm rounded-full ${selectedDifficulty === 'Hard'
                ? 'bg-red-600 text-white'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}
            >
              Hard
            </button>
          </div>
        </div>
      </div>

      {filteredRecipes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </motion.div>
      ) : (
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="transform-gpu"
        >
          {getRecipeGroups(filteredRecipes).map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              variants={groupVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 transform-gpu"
            >
              {group.map((recipe) => (
                <motion.div
                  key={recipe.id}
                  variants={getCardVariants(scrollDirection)}
                  className="group transform-gpu"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitFontSmoothing: 'antialiased'
                  }}
                >
                  <Link to={`/recipe/${recipe.id}`} className="block">
                    <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4">
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-500 transition-colors">
                      {recipe.name}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default RecipeGrid;
