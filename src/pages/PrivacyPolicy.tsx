import { motion } from 'framer-motion';
import { getPageTransition } from '../utils/animationUtils';

const PrivacyPolicy = () => {
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
                    Privacy Policy
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="prose dark:prose-invert max-w-none"
                >
                    <h2>1. Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us when you create an account, share recipes, or contact us.
                    </p>

                    <h2>2. How We Use Your Information</h2>
                    <p>
                        We use the information we collect to provide and improve our services, communicate with you, and ensure security.
                    </p>

                    <h2>3. Information Sharing</h2>
                    <p>
                        We do not sell or share your personal information with third parties except as described in this policy.
                    </p>

                    {/* Add more sections as needed */}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default PrivacyPolicy;
