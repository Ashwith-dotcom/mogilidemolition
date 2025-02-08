import React from 'react';

const TrustedBy = () => {

  const companies = [
    { name: 'Company 1', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMwCIQ_mwjG8eR6kgmNZTa25L1MfRB95mjcg&s' },
    { name: 'Company 2', logo: 'https://newprojects.99acres.com/projects/my_home_group/my_home_avatar/log.jpg' },
    { name: 'Company 3', logo: 'https://d2yoo3qu6vrk5d.cloudfront.net/images/20180531113006/microsoft-900x485.jpg?itok=1527809711' },
    { name: 'Company 4', logo: 'https://addadocumentsmumbai.s3.ap-south-1.amazonaws.com/mum/brk/gallery/148329/ee26908bf9629eeb4b37dac350f4754a-1629328606-blob' },
    { name: 'Company 5', logo: 'https://d36c9y7c8zyajq.cloudfront.net/company_logo/161017124019MUPPA%20LOGO%20-%20Copy.jpg' },
    { name: 'Company 6', logo: 'https://education.sakshi.com/sites/default/files/images/2023/08/05/admissions-images-rguktcet-1691224748.jpg' }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
          Trusted By Industry Leaders
        </h2>
        <div className="flex overflow-hidden space-x-8">
          <div className="flex space-x-8 animate-scroll">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 h-16 flex items-center"
              >
                <img
                  className="h-8"
                  src={company.logo}
                  alt={company.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;