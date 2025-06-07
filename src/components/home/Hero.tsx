import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);

  return (
    <motion.div className="relative overflow-hidden min-h-screen flex items-center pt-20" style={{ opacity }}>
      {/* Add negative margin to compensate for header height */}
      <div className="absolute inset-0 -mt-24">
        {/* Background Image with Overlay */}
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ scale }}
        >
          <motion.img
            src="https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg"
            alt="Biriyani Background"
            className="w-full h-full object-cover opacity-60"
            initial={{ filter: 'blur(10px)' }}
            animate={{ filter: 'blur(0px)' }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </div>

      <div className="relative container-custom py-32 md:py-40 flex flex-col items-center text-center z-10">
        {/* Content */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl text-white font-display mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Discover the Art of{" "}
          <motion.span
            className="text-primary-400 inline-block"
            animate={{
              rotate: [0, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            Biriyani
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Explore authentic recipes from every region of India,
          with step-by-step instructions to create the perfect biriyani at home.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link
              to="/recipes"
              className="btn-primary inline-flex items-center text-lg px-8 py-4 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
            >
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: -5 }}
                transition={{ duration: 0.3 }}
              >
                Explore Recipes
              </motion.span>
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute -left-20 top-1/4"
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
          className="absolute -right-20 bottom-1/4"
          animate={{
            y: [20, -20, 20],
            rotate: [360, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          <div className="w-40 h-40 bg-primary-500/10 rounded-full blur-xl" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
