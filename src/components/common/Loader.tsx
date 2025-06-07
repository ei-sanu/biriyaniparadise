import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative">
                <motion.div
                    className="w-16 h-16 border-4 border-primary-500 rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360],
                        borderRadius: ["50%", "40%", "50%"]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute inset-0 border-4 border-primary-400/30 rounded-full"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </motion.div>
    );
};

export default Loader;
