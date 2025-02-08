import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src= "https://storage.googleapis.com/mogilidemolitions/hero/hero1.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">Mogili Demolitions</span>
            <span className="block text-yellow-500">Professional Demolition Services</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300 sm:max-w-3xl">
            Expert demolition, concrete cutting, and core cutting services with precision and safety
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
              <a
                href="#contact"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 md:py-4 md:text-lg md:px-10"
              >
                Get a Quote
              </a>
              <a
                href="#services"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-yellow-500 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;