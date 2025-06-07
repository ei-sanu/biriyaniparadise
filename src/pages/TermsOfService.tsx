import { motion } from 'framer-motion';
import { getPageTransition } from '../utils/animationUtils';

const TermsOfService = () => {
    return (
        <motion.div
            initial={getPageTransition.initial}
            animate={getPageTransition.animate}
            exit={getPageTransition.exit}
            transition={getPageTransition.transition}
            className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-900"
        >
            <div className="container-custom">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-display font-bold mb-8 text-center"
                >
                    Terms of Service
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="prose dark:prose-invert max-w-none"
                >
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using Biriyani Paradise, you agree to be bound by these Terms of Service.
                    </p>

                    <h2>2. User Content</h2>
                    <p>
                        Users may submit recipes, reviews, and comments. You retain ownership of your content but grant us a license to use it.
                    </p>

                    <h2>3. Intellectual Property</h2>
                    <p>
                        All content on Biriyani Paradise, including recipes, images, and text, is protected by copyright and other intellectual property laws.
                    </p>

                    {/* Add more sections as needed */}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default TermsOfService;
