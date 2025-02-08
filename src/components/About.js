import React from 'react';
import { CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <h3 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About Mogili Demolitions
            </h3>
            <p className="mt-4 text-lg text-gray-500">
              With years of experience in the demolition industry, we provide professional and safe demolition services. Our team of experts ensures precise execution of every project, whether it's building demolition, concrete cutting, or core drilling.
            </p>
            <div className="mt-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-yellow-500" />
                <span className="text-lg text-gray-700">Licensed & Insured</span>
              </div>
              <div className="mt-4 flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-yellow-500" />
                <span className="text-lg text-gray-700">Safety First Approach</span>
              </div>
              <div className="mt-4 flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-yellow-500" />
                <span className="text-lg text-gray-700">Expert Team</span>
              </div>
              <div className="mt-4 flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-yellow-500" />
                <span className="text-lg text-gray-700">Modern Equipment</span>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="relative">
              <img
                className="rounded-lg shadow-lg object-cover"
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80"
                alt="Demolition work"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;