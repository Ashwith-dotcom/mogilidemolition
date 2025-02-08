import React, { useState, useRef, useEffect } from 'react';
import { Phone, MessageSquare, ChevronRight, ChevronLeft, Hammer, Drill, CircleDot, X, ChevronDown } from 'lucide-react';
import { servicesData } from './servicesdata';

const ServiceOverview = ({ categories }) => {
  const scrollToService = (serviceId) => {
    const element = document.getElementById(serviceId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="mb-16">
      <p className="text-2xl font-bold text-center mb-8">
        Click on any service below to explore more details
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(categories).map(([key, category]) => (
          <div key={key} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-center mb-4">
              {key === 'demolition' && <Hammer className="w-12 h-12 text-yellow-500" />}
              {key === 'concreteCutting' && <Drill className="w-12 h-12 text-yellow-500" />}
              {key === 'coreCutting' && <CircleDot className="w-12 h-12 text-yellow-500" />}
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">{category.title}</h3>
            <p className="text-gray-600 text-center mb-6">{category.description}</p>
            <div className="space-y-3">
              {category.services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => scrollToService(service.id)}
                  className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 
                    flex items-center justify-between shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                    active:translate-y-0 active:shadow-md
                    border border-gray-700 hover:border-gray-600
                    relative overflow-hidden
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent
                    before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700"
                >
                  <span className="font-medium relative z-10">{service.name}</span>
                  <ChevronDown className="w-5 h-5 relative z-10" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ServiceCard = ({ service }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scale, setScale] = useState(1);
  const intervalRef = useRef(null);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const minSwipeDistance = 50;

  const isVideo = (url) => {
    return url.toLowerCase().match(/\.(mp4|webm|ogg)$/);
  };

  useEffect(() => {
    if (!showGallery && !isVideo(service.images[currentImageIndex].url)) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === service.images.length - 1 ? 0 : prev + 1
        );
      }, 2000);
    }
    return () => clearInterval(intervalRef.current);
  }, [service.images.length, showGallery, currentImageIndex]);

  // Reset video state when changing media
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [currentImageIndex]);

  const nextImage = () => {
    clearInterval(intervalRef.current);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setCurrentImageIndex((prev) => 
      prev === service.images.length - 1 ? 0 : prev + 1
    );
    setScale(1);
  };

  const prevImage = () => {
    clearInterval(intervalRef.current);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setCurrentImageIndex((prev) => 
      prev === 0 ? service.images.length - 1 : prev - 1
    );
    setScale(1);
  };

  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      containerRef.current = { distance };
    } else {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const onTouchMove = (e) => {
    if (e.touches.length === 2 && containerRef.current) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scale = distance / containerRef.current.distance;
      setScale(Math.min(Math.max(1, scale * 1.5), 3));
    } else {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    containerRef.current = null;
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const renderMedia = () => {
    const currentMedia = service.images[currentImageIndex];
    if (isVideo(currentMedia.url)) {
      return (
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            src={currentMedia.url}
            className={`w-full h-full ${showGallery ? 'object-contain' : 'object-cover'}`}
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            controls={showGallery}
            playsInline
            loop
            style={{
              transform: showGallery ? `scale(${scale})` : 'none',
              transition: 'transform 0.2s ease-out'
            }}
          />
          {!showGallery && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                 onClick={(e) => {
                   e.stopPropagation();
                   togglePlay();
                 }}>
              <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center
                            transform transition-transform duration-200 hover:scale-110 active:scale-95">
                {isPlaying ? (
                  <span className="text-3xl">⏸</span>
                ) : (
                  <span className="text-3xl ml-1">▶</span>
                )}
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <img
          src={currentMedia.url}
          alt={currentMedia.alt || service.name}
          className={`w-full h-full ${showGallery ? 'object-contain' : 'object-cover'}`}
          style={{
            transform: showGallery ? `scale(${scale})` : 'none',
            transition: 'transform 0.2s ease-out'
          }}
        />
      );
    }
  };

  return (
    <>
      <div id={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
        <div 
          className="relative h-[60vh] cursor-pointer"
          onClick={() => setShowGallery(true)}
        >
          {renderMedia()}
          {service.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full
                          hover:bg-black/70 transition-all duration-200 transform hover:scale-110 active:scale-95"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full
                          hover:bg-black/70 transition-all duration-200 transform hover:scale-110 active:scale-95"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent h-24 flex items-end">
            <p className="text-white p-4">
              {service.description}
            </p>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{service.name}</h3>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-yellow-600 font-semibold hover:text-yellow-700 mb-2
                     transition-all duration-200 transform hover:scale-105 active:scale-95
                     px-4 py-1 rounded-full hover:bg-yellow-50"
          >
            {showDetails ? 'Show Less' : 'Learn More'}
          </button>

          {showDetails && (
            <div className="space-y-6 mt-4">
              <div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Features</h4>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="bg-gray-50 p-4 rounded-lg transform transition-all duration-200 hover:scale-[1.02]">
                      <h5 className="font-semibold text-gray-900">{feature.title}</h5>
                      <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Why Choose Us</h4>
                <ul className="space-y-3">
                  {service.whychooseus.map((reason, index) => (
                    <li key={index} className="bg-gray-50 p-4 rounded-lg transform transition-all duration-200 hover:scale-[1.02]">
                      <h5 className="font-semibold text-gray-900">{reason.title}</h5>
                      <p className="text-gray-600 text-sm mt-1">{reason.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-4">
            <a
              href="tel:+919866362895"
              className="flex-1 flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg
                       hover:bg-green-700 transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0
                       shadow-lg hover:shadow-xl active:shadow-md"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </a>
            <a
              href="https://wa.me/9866362895"
              className="flex-1 flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-lg
                       hover:bg-green-600 transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0
                       shadow-lg hover:shadow-xl active:shadow-md"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {showGallery && (
        <div 
          className="fixed inset-0 bg-black z-50 touch-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button
            onClick={() => {
              setShowGallery(false);
              setScale(1);
              if (videoRef.current) {
                videoRef.current.pause();
                setIsPlaying(false);
              }
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 p-2
                     transition-transform duration-200 transform hover:scale-110 active:scale-95"
          >
            <X size={32} />
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center">
            {renderMedia()}
            
            <button
              onClick={prevImage}
              className="absolute left-4 text-white hover:text-gray-300 z-50
                       transition-transform duration-200 transform hover:scale-110 active:scale-95"
            >
              <ChevronLeft size={32} />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 text-white hover:text-gray-300 z-50
                       transition-transform duration-200 transform hover:scale-110 active:scale-95"
            >
              <ChevronRight size={32} />
            </button>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-50">
              {service.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setScale(1);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-200 transform hover:scale-125 active:scale-95 ${
                    index === currentImageIndex ? 'bg-white scale-110' : 'bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ServiceSection = ({ category, services }) => {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{category}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

const Services = () => {
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  
  return (
    <section id="services" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Our Services</h2>
          <p className="mt-4 text-xl text-gray-600">
            Professional demolition and cutting services with precision and expertise
          </p>
        </div>

        <ServiceOverview categories={servicesData} />

        {Object.entries(servicesData).map(([key, category]) => (
          <ServiceSection
            key={key}
            category={category.title}
            services={category.services}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
