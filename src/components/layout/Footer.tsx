import { motion } from 'framer-motion';
import { ArrowRight, Contact, Facebook, Instagram, MapPin, Phone, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms of Service', path: '/terms-of-service' }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    { icon: <Facebook size={20} />, label: 'Facebook', href: '#' },
    { icon: <Twitter size={20} />, label: 'Twitter', href: '#' },
    { icon: <Instagram size={20} />, label: 'Instagram', href: '#' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary-500 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-primary-500 blur-3xl"></div>
      </div>

      <div className="container-custom py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center mb-6 group">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="text-primary-400 mr-2"
              >
                {/* ...existing SVG... */}
              </motion.div>
              <h2 className="text-2xl font-display font-bold">
                <span className="bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">Biriyani</span>
                <span className="text-white"> Paradise</span>
              </h2>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Explore the rich traditions and flavors of authentic biriyani recipes from across the Indian subcontinent.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-700 hover:bg-primary-500 p-3 rounded-full transition-colors duration-300"
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-6 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-500"></span>
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  className="group"
                >
                  <Link
                    to={link.path}
                    className="flex items-center text-gray-300 hover:text-primary-400 transition-colors duration-300"
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-6 relative">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-500"></span>
            </h3>
            <ul className="space-y-4">
              <motion.li
                className="flex items-start group"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5 text-primary-400 mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300">Lovely Professional University BH - 4, Phagwara - 144411</span>
              </motion.li>
              <motion.li
                className="flex items-center group"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300">+91 7008450074</span>
              </motion.li>
              <motion.li
                className="flex items-center group"
                whileHover={{ x: 5 }}
              >
                <Contact className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a
                  href="https://somesh.social"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  somesh.social
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="border-t border-gray-700/50 mt-12 pt-8 text-center"
        >
          <p className="text-gray-400">
            &copy; {currentYear} Biriyani Paradise. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
