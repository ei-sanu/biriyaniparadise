import { motion, useScroll, useSpring } from 'framer-motion';
import { Clock, Users } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../../data/recipes';

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

const RecipeCard = ({ recipe, index }: RecipeCardProps) => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const { id, name, region, description, image, prepTime, cookTime, servings, difficulty } = recipe;

  // Throttle scroll direction updates
  const updateScrollDirection = useCallback((latest: number) => {
    requestAnimationFrame(() => {
      const direction = latest > lastScrollY.current ? 'down' : 'up';
      setScrollDirection(direction);
      lastScrollY.current = latest;
    });
  }, []);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', updateScrollDirection);
    return () => unsubscribe();
  }, [scrollY, updateScrollDirection]);

  // Spring animation for smoother transitions
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: scrollDirection === 'down' ? 50 : -50, // Reduced movement distance
      y: 10
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
        delay: index * 0.05, // Reduced delay between cards
      }
    },
    hover: {
      y: -5, // Reduced hover lift
      scale: 1.01, // Reduced scale
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      x: scrollDirection === 'down' ? -50 : 50,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  return (
    <motion.div
      className="recipe-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden will-change-transform"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover="hover"
      layout // Smooth layout transitions
      style={{ x, y }} // Use spring values
      transformTemplate={(props) => `translateX(${props.x}px) translateY(${props.y}px)`} // Hardware acceleration
    >
      <Link to={`/recipe/${id}`} className="block h-full">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColor[difficulty]}`}>
              {difficulty}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{region}</p>

          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{prepTime + cookTime} min</span>
            </div>
            <div className="flex items-center">
              <Users size={14} className="mr-1" />
              <span>{servings} servings</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;
