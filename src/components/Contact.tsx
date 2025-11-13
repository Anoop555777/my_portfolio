import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isHovered, setIsHovered] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setStatusMessage('Sending your message...');

    try {
      // EmailJS configuration
      const serviceId = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
      const templateId = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
      const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'ajbisht99@gmail.com', // Your email
        },
        publicKey
      );

      setStatus('success');
      setStatusMessage('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setStatusMessage('');
      }, 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setStatusMessage('Failed to send message. Please try again or email me directly.');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setStatusMessage('');
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'ajbisht99@gmail.com',
      href: 'mailto:ajbisht99@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+919458966112',
      href: 'tel:+919458966112',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'khatima, UK,India',
      href: '#',
    },
  ];

  return (
    <section id="contact" className="min-h-screen py-20 px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have a project in mind or just want to chat? Drop me a message!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions. Let's build something
                amazing together!
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">{info.label}</div>
                    <div className="text-lg font-medium group-hover:text-primary transition-colors">
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Decorative Element */}
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="hidden lg:block w-64 h-64 border-2 border-primary/20 rounded-full absolute bottom-10 left-10"
            />
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  status === 'sending'
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary to-secondary hover:shadow-2xl'
                }`}
              >
                <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                <motion.div
                  animate={{ x: isHovered && status !== 'sending' ? 5 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Send className="w-5 h-5" />
                </motion.div>
              </motion.button>

              {/* Status Message */}
              {statusMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex items-center gap-2 p-4 rounded-xl ${
                    status === 'success'
                      ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                      : status === 'error'
                      ? 'bg-red-500/20 border border-red-500/50 text-red-300'
                      : 'bg-blue-500/20 border border-blue-500/50 text-blue-300'
                  }`}
                >
                  {status === 'success' && <CheckCircle className="w-5 h-5" />}
                  {status === 'error' && <AlertCircle className="w-5 h-5" />}
                  <span className="text-sm">{statusMessage}</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-20 pt-10 border-t border-white/10"
      >
        <p className="text-gray-400">
          © 2025 My Portfolio. Designed & Built with{' '}
          <span className="text-red-500">❤</span> and{' '}
          <span className="gradient-text">creativity</span>
        </p>
      </motion.div>
    </section>
  );
};

export default Contact;

