import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              cardsRef.current,
              {
                opacity: 0,
                y: 50,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: '🌐',
      title: 'Website Development',
      description: 'Static & dynamic websites built with modern technologies like React, ExpressJS, and TailwindCSS.',
    },
    {
      icon: '✨',
      title: 'GSAP Animations',
      description: 'Modern, smooth animations that enhance user experience and engagement.',
    },
    {
      icon: '🎨',
      title: 'Branding & Visual Identity',
      description: 'Complete brand identity design that reflects your business values and vision.',
    },
    {
      icon: '⚙️',
      title: 'Backend Development',
      description: 'Robust ExpressJS backend solutions for scalable and secure applications.',
    },
    {
      icon: '💬',
      title: 'WhatsApp Integration',
      description: 'Seamless client contact systems integrated with WhatsApp for quick follow-up.',
    },
    {
      icon: '🚀',
      title: 'Hosting & Maintenance',
      description: 'Reliable hosting solutions and ongoing maintenance for your digital presence.',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive digital solutions to transform your business
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

