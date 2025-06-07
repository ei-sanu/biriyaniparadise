import { motion } from 'framer-motion';
import { getPageTransition } from '../utils/animationUtils';

const AboutPage = () => {
  return (
    <motion.div
      initial={getPageTransition.initial}
      animate={getPageTransition.animate}
      exit={getPageTransition.exit}
      transition={getPageTransition.transition}
      className="pt-16"
    >
      <div className="bg-gray-100 dark:bg-gray-900 py-16">
        <div className="container-custom">
          <h1 className="text-center mb-8">About Biriyani Paradise</h1>
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <p className="text-lg mb-6">
              Biriyani Paradise is dedicated to preserving and sharing the rich traditions of biriyani from across the Indian subcontinent. Our mission is to bring these authentic recipes into your home kitchen with detailed instructions, tips, and techniques from expert chefs.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="mb-6">
              Founded in 2025 by a group of food enthusiasts with a passion for biriyani, Biriyani Paradise began as a small collection of family recipes passed down through generations. What started as a hobby quickly grew into a comprehensive resource for biriyani lovers worldwide.
            </p>
            <p className="mb-6">
              Our team travels across India to research regional variations, learn from local chefs, and document authentic cooking methods. We believe that each biriyani tells a story of its region's culture, history, and people.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
            <p className="mb-6">
              Every recipe on Biriyani Paradise is:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Researched thoroughly for authenticity</li>
              <li>Tested multiple times in home kitchens</li>
              <li>Written with clear, step-by-step instructions</li>
              <li>Accompanied by chef's tips to ensure success</li>
              <li>Documented with high-quality photography</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
            <p className="mb-6">
              Biriyani Paradise is more than just a recipe website—it's a community of food lovers united by a passion for biriyani. We invite you to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Share your cooking experiences with our recipes</li>
              <li>Submit your family's traditional biriyani recipes</li>
              <li>Participate in our virtual cooking classes</li>
              <li>Connect with other biriyani enthusiasts</li>
            </ul>

            <p>
              Thank you for being part of our journey to celebrate the diverse and delicious world of biriyani!
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
