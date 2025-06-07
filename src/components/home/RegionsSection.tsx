import { motion } from 'framer-motion';

const regions = [
  {
    name: 'North India',
    description: 'Known for Lucknowi and Sindhi Biryani, featuring distinct aromatics and cooking methods.',
    image: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg'
  },
  {
    name: 'South India',
    description: 'Home to Dindigul, Ambur, and Malabar Biryani, characterized by short-grain rice and unique spice blends.',
    image: 'https://images.pexels.com/photos/5410418/pexels-photo-5410418.jpeg'
  },
  {
    name: 'East India',
    description: 'Features the distinctive Kolkata Biryani with potatoes and eggs, showing strong Awadhi influence.',
    image: 'https://images.pexels.com/photos/10897812/pexels-photo-10897812.jpeg'
  },
  {
    name: 'West India',
    description: 'Offers Bombay and Bhatkali Biryani, with coastal influences and bold spice profiles.',
    image: 'https://images.pexels.com/photos/6260921/pexels-photo-6260921.jpeg'
  }
];

const RegionsSection = () => {
  return (
    <section className="section">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-12 scroll-animation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-display font-bold mb-4">
            Biriyani Across <span className="text-primary-600 dark:text-primary-400">Regions</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            India's diverse culinary landscape has given rise to numerous regional biriyani variations, 
            each with its own distinct ingredients, cooking techniques, and flavors.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regions.map((region, index) => (
            <motion.div 
              key={region.name}
              className="scroll-animation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="sm:w-1/3 aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={region.image} 
                    alt={region.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">{region.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{region.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegionsSection;