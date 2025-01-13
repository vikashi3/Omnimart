import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-neutral min-h-screen flex flex-col">
      {/* About Us Section */}
      <section className="flex-1 p-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-teal-500 mb-8 text-center">
            About Omnimart
          </h2>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-primary">
              Our Mission
            </h3>
            <p className="mb-4 text-teal-500">
              At <strong>Omnimart</strong>, our mission is to empower residents
              and visitors with the information they need to make the most of
              their urban experience. Whether you're looking for the best local
              deals, upcoming events, or hidden gems in your city, our platform
              provides you with the tools to discover everything your city has
              to offer.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-primary">
              Who We Are
            </h3>
            <p className="mb-4 text-teal-500">
              We are a passionate team of urban enthusiasts, developers, and
              designers who believe that a well-informed community is a thriving
              community. <strong>Omnimart</strong> was created to bridge the gap
              between city dwellers and the rich array of services, businesses,
              and events that make each city unique.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-primary">
              What We Offer
            </h3>
            <ul className="list-disc pl-5 text-teal-500 mb-4">
              <li className="mb-2">
                Comprehensive directories of local businesses and services.
              </li>
              <li className="mb-2">
                Real-time updates on city-wide events and activities.
              </li>
              <li className="mb-2">
                Exclusive deals and discounts from your favorite places.
              </li>
              <li className="mb-2">
                Curated guides to help you explore your city like never before.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4 text-primary">
              Our Vision
            </h3>
            <p className="mb-4 text-teal-500">
              We envision a future where every city is connected, vibrant, and
              accessible. Through <strong>Omnimart</strong>, we aim to foster a
              sense of community and belonging, making it easier for people to
              engage with their surroundings and support local businesses. We
              are committed to continuous improvement, always seeking new ways
              to enhance the urban experience for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-500 text-white p-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2024 Omnimart. All Rights Reserved.</p>
          <div className="mt-2">
            <a href="#privacy" className="hover:text-primary mx-2">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-primary mx-2">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
