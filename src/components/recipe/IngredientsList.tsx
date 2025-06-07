import { Check } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface IngredientsListProps {
  ingredients: string[];
}

const IngredientsList = ({ ingredients }: IngredientsListProps) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
      <ul className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <motion.li 
            key={index}
            className="flex items-start space-x-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <button
              onClick={() => toggleItem(index)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mt-0.5 flex items-center justify-center transition-colors ${
                checkedItems[index]
                  ? 'bg-primary-500 border-primary-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              aria-label={`Mark ${ingredient} as ${checkedItems[index] ? 'needed' : 'available'}`}
            >
              {checkedItems[index] && <Check size={14} className="text-white" />}
            </button>
            <span className={`${checkedItems[index] ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
              {ingredient}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsList;