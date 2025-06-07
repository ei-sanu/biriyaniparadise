import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users } from 'lucide-react';
import { recipes, Recipe } from '../data/recipes';
import VideoEmbed from '../components/recipe/VideoEmbed';
import IngredientsList from '../components/recipe/IngredientsList';
import Instructions from '../components/recipe/Instructions';
import RecipeTips from '../components/recipe/RecipeTips';
import Timer from '../components/recipe/Timer';
import { getPageTransition } from '../utils/animationUtils';
import NotFoundPage from './NotFoundPage';

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      const found = recipes.find(r => r.id === id) || null;
      setRecipe(found);
      setIsLoading(false);
      
      // Scroll to top when recipe changes
      window.scrollTo(0, 0);
    }, 500);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!recipe) {
    return <NotFoundPage />;
  }
  
  return (
    <motion.div
      initial={getPageTransition.initial}
      animate={getPageTransition.animate}
      exit={getPageTransition.exit}
      transition={getPageTransition.transition}
    >
      {/* Hero Section */}
      <div className="relative h-[50vh] lg:h-[60vh]">
        <div className="absolute inset-0">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
        </div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="container-custom pb-12">
            <Link to="/" className="inline-flex items-center text-white mb-4 hover:text-primary-400 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Recipes
            </Link>
            <h1 className="text-white mb-2">{recipe.name}</h1>
            <p className="text-xl text-gray-200 mb-4">{recipe.region}</p>
            
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center">
                <Clock className="mr-1 h-5 w-5" />
                <span>Prep: {recipe.prepTime} min</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-5 w-5" />
                <span>Cook: {recipe.cookTime} min</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-5 w-5" />
                <span>Serves: {recipe.servings}</span>
              </div>
              <div className="flex items-center">
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                  recipe.difficulty === 'Easy'
                    ? 'bg-green-500/80 text-white'
                    : recipe.difficulty === 'Medium'
                    ? 'bg-yellow-500/80 text-white'
                    : 'bg-red-500/80 text-white'
                }`}>
                  {recipe.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="text-lg mb-8">
              {recipe.description}
            </p>
            
            <VideoEmbed youtubeId={recipe.youtubeId} title={recipe.name} />
            
            <Instructions instructions={recipe.instructions} />
            
            <RecipeTips tips={recipe.tips} />
          </div>
          
          <div className="space-y-8">
            <IngredientsList ingredients={recipe.ingredients} />
            <Timer prepTime={recipe.prepTime} cookTime={recipe.cookTime} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipePage;