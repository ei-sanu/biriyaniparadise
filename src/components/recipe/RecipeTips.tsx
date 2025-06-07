import { Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecipeTipsProps {
  tips: string[];
}

const RecipeTips = ({ tips }: RecipeTipsProps) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Lightbulb className="mr-2 text-yellow-500" />
        Chef's Tips
      </h3>
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <motion.li 
            key={index}
            className="flex items-start"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <span className="inline-block w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span>{tip}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeTips;