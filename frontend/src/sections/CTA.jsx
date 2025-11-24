import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Digital Presence?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Let's work together to create a website that drives results and grows your business.
        </p>
        <Link
          to="/contact"
          className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
        >
          Get Started Today
        </Link>
      </div>
    </section>
  );
};

export default CTA;

