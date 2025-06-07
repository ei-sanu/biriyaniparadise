import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { getPageTransition } from '../utils/animationUtils';

const ContactPage = () => {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending....");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "9c4dbdf0-8c38-47a5-aab1-9e3b06b196db");
    formData.append("from_name", "Biriyani Paradise Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setResult("Thank you for your message! We'll get back to you soon.");
        // Reset form
        form.reset();
        // Reset any custom state if needed
        const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]');
        const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]');
        const messageInput = form.querySelector<HTMLTextAreaElement>('textarea[name="message"]');

        if (nameInput) nameInput.value = '';
        if (emailInput) emailInput.value = '';
        if (messageInput) messageInput.value = '';
      } else {
        setResult("Something went wrong. Please try again.");
        console.error("Form submission error:", data);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setResult("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
      // Reset result message after 5 seconds
      setTimeout(() => {
        setResult("");
      }, 5000);
    }
  };

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
          <motion.h1
            className="text-center text-4xl md:text-5xl font-display font-bold mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.h1>

          <div className="flex justify-center items-start">
            <div className="w-full max-w-2xl">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">Send Us a Message</h2>

                {result && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 rounded-md text-center mb-6 ${result.includes("thank you")
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                      }`}
                  >
                    <p className="font-medium">{result}</p>
                  </motion.div>
                )}

                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="input w-full"
                      placeholder='Enter Your Name'
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="input w-full"
                      placeholder='Enter Your Email'
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="input w-full"
                      placeholder='What can we help you with?'
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2 w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
