import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';
import RecipeCard from '../components/home/RecipeCard';
import { recipes } from '../data/recipes';

const RecipesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                mass: 1
            }
        }
    };

    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = !selectedRegion || recipe.region === selectedRegion;
        const matchesDifficulty = !selectedDifficulty || recipe.difficulty === selectedDifficulty;
        return matchesSearch && matchesRegion && matchesDifficulty;
    });

    const regions = [...new Set(recipes.map(recipe => recipe.region))];
    const difficulties = ['Easy', 'Medium', 'Hard'];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-50 dark:bg-gray-900 py-24"
        >
            <div className="container-custom">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        Explore Our{" "}
                        <motion.span
                            className="text-primary-600 dark:text-primary-400"
                            animate={{
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            Biriyani
                        </motion.span>{" "}
                        Collection
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Discover authentic biriyani recipes from different regions of India
                    </p>
                </motion.div>

                {/* Search and Filter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col md:flex-row gap-4 mb-12"
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search recipes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                    <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="py-3 px-4 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white min-w-[150px]"
                    >
                        <option value="">All Regions</option>
                        {regions.map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                    <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="py-3 px-4 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white min-w-[150px]"
                    >
                        <option value="">All Difficulties</option>
                        {difficulties.map(difficulty => (
                            <option key={difficulty} value={difficulty}>{difficulty}</option>
                        ))}
                    </select>
                </motion.div>

                {/* Recipe Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredRecipes.map((recipe, index) => (
                        <motion.div
                            key={recipe.id}
                            variants={cardVariants}
                            className="transform-gpu"
                        >
                            <RecipeCard recipe={recipe} index={index} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* No Results Message */}
                {filteredRecipes.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Try adjusting your search or filters
                        </p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default RecipesPage;
