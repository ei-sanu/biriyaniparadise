import { motion } from 'framer-motion';

interface InstructionsProps {
  instructions: string[];
}

const Instructions = ({ instructions }: InstructionsProps) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4">Instructions</h3>
      <ol className="list-decimal pl-5 space-y-4">
        {instructions.map((instruction, index) => (
          <motion.li 
            key={index}
            className="pl-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {instruction}
          </motion.li>
        ))}
      </ol>
    </div>
  );
};

export default Instructions;