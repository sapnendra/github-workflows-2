import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              contentRef.current,
              {
                opacity: 0,
                y: 30,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
              },
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      title: 'Creativity',
      description: 'Crafting unique digital experiences that stand out.',
    },
    {
      title: 'Innovation',
      description: 'Using modern tech like React, TailwindCSS, ExpressJS, and GSAP.',
    },
    {
      title: 'Transparency',
      description: 'Clear processes and honest communication.',
    },
    {
      title: 'Reliability',
      description: 'Meeting expectations and timelines consistently.',
    },
    {
      title: 'Continuous Growth',
      description: 'Constant improvement in skills and delivery.',
    },
  ];

  return (
    <div className="pt-16 min-h-screen">
      <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Overview */}
          <div ref={(el) => (contentRef.current[0] = el)} className="mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About ByteBloom Agency
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              ByteBloom Agency is a digital-first web development and design agency dedicated to
              crafting high-performance, visually impactful, and business-driven websites. The name
              "ByteBloom" symbolizes growth through technology — where every digital byte
              contributes to a brand's success.
            </p>
          </div>

          {/* Origin Story */}
          <div ref={(el) => (contentRef.current[1] = el)} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Origin Story
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              ByteBloom Agency began with a mission to provide small businesses with professional,
              transparent, and result-oriented web solutions. Recognizing the challenges faced by
              small brands—unclear pricing, low-quality websites, lack of support—the agency was
              formed to bridge this gap using modern technologies and ethical communication.
            </p>
          </div>

          {/* Vision & Mission */}
          <div ref={(el) => (contentRef.current[2] = el)} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Vision & Mission
            </h2>
            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Vision Statement
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                "To become a trusted digital partner that transforms brands through innovative web
                solutions, seamless user experiences, and meaningful business growth."
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Mission Statement
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Build scalable, elegant websites.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Offer transparent communication and pricing.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Deliver high-conversion digital solutions.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Combine modern technologies with creative design.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Provide long-term support and client relationships.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Core Values */}
          <div ref={(el) => (contentRef.current[3] = el)} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* USP */}
          <div ref={(el) => (contentRef.current[4] = el)} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Unique Selling Proposition
            </h2>
            <ul className="space-y-3 text-lg text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Premium quality with transparent pricing</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>One-to-one client communication</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Modern aesthetic designs with animations</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Fast delivery with consistent quality</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Professional development process and documentation</span>
              </li>
            </ul>
          </div>

          {/* Closing Note */}
          <div
            ref={(el) => (contentRef.current[5] = el)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl text-white"
          >
            <p className="text-lg leading-relaxed">
              ByteBloom Agency is more than a service provider — it is a digital growth partner
              committed to transforming business ideas into meaningful web experiences.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
