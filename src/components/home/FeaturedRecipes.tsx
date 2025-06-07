import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Recipe, recipes } from '../../data/recipes';

const FeaturedRecipes = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  useEffect(() => {
    // Randomly select 3 recipes to feature
    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
    setFeaturedRecipes(shuffled.slice(0, 3));
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const cardVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  };

  return (
    <section className="section bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-2">Featured Recipes</h2>
          <p className="text-gray-600 dark:text-gray-400">Our selection of must-try biriyani dishes</p>
        </div>

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          exit="exit"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {featuredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              variants={cardVariants}
              transition={{
                duration: 0.5,
                ease: "easeOut"
              }}
              className="group"
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
                <p className="text-gray-600 dark:text-gray-400">
                  {recipe.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;
