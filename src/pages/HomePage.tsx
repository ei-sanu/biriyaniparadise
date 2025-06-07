import { motion } from 'framer-motion';
import FeaturedRecipes from '../components/home/FeaturedRecipes';
import Hero from '../components/home/Hero';
import RegionsSection from '../components/home/RegionsSection';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { getPageTransition } from '../utils/animationUtils';

const HomePage = () => {
  const featuredRef = useScrollAnimation();
  const regionsRef = useScrollAnimation();

  return (
    <motion.div
      initial={getPageTransition.initial}
      animate={getPageTransition.animate}
      exit={getPageTransition.exit}
      transition={getPageTransition.transition}
    >
      <Hero />

      <motion.div
        ref={featuredRef.ref}
        initial={{ opacity: 0, y: 50 }}
        animate={featuredRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <FeaturedRecipes />
      </motion.div>

      <motion.div
        ref={regionsRef.ref}
        initial={{ opacity: 0, y: 50 }}
        animate={regionsRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <RegionsSection />
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="fixed -z-10 top-1/4 left-0 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"
        animate={{
          y: [-20, 20, -20],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="fixed -z-10 bottom-1/4 right-0 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"
        animate={{
          y: [20, -20, 20],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default HomePage;
