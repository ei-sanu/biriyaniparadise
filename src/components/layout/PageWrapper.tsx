import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageWrapperProps {
    children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
            className="relative"
        >
            {/* Decorative Elements */}
            <motion.div
                className="fixed -left-20 top-1/4 z-0"
                animate={{
                    y: [-20, 20, -20],
                    rotate: [0, 360],
                    opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: 10, repeat: Infinity }}
            >
                <div className="w-40 h-40 bg-primary-500/10 rounded-full blur-xl" />
            </motion.div>

            <motion.div
                className="fixed -right-20 bottom-1/4 z-0"
                animate={{
                    y: [20, -20, 20],
                    rotate: [360, 0],
                    opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: 10, repeat: Infinity }}
            >
                <div className="w-40 h-40 bg-primary-500/10 rounded-full blur-xl" />
            </motion.div>

            {/* Page Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default PageWrapper;
