import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPageTransition } from '../utils/animationUtils';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={getPageTransition.initial}
      animate={getPageTransition.animate}
      exit={getPageTransition.exit}
      transition={getPageTransition.transition}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The recipe you're looking for might have been moved or doesn't exist.
        </p>
        <Link 
          to="/"
          className="btn-primary inline-flex items-center"
        >
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;