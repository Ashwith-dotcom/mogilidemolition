import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Hammer } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Hammer className="h-8 w-8 text-yellow-500" />
              <span className="ml-2 text-2xl font-bold text-white">Mogili Demolitions</span>
            </div>
            <p className="mt-4 text-gray-300">
              Professional demolition services with a commitment to safety, precision, and customer satisfaction.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-yellow-500 mr-2" />
                <a href="tel:+919866362895" className="text-gray-300 hover:text-white">
                +91 9866362895
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-yellow-500 mr-2" />
                <a href="mailto:mogilidemolitions@gmail.com" className="text-gray-300 hover:text-white">
                  mogilidemolitions@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-gray-300">
                  12-9-66/ER/190 Raghavendra Colony, Kaithalapur, Moosapet, Hyderabad, Telangana, 500018
                </span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Mogili Demolitions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;