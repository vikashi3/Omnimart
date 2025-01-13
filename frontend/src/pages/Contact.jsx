import React from "react";

const Contact = () => {
  return (
    <div className="bg-neutral min-h-screen flex flex-col">
      {/* Contact Information */}
      <section className="flex-1 p-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-teal-500 mb-8 text-center">
            Contact Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Contact Details */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-primary">
                Get in Touch
              </h3>
              <p className="mb-4">
                <strong>Phone:</strong> +1 234 567 890
              </p>
              <p className="mb-4">
                <strong>Email:</strong> contact@knowyourcity.com
              </p>
              <p className="mb-4">
                <strong>Address:</strong> 123 City Street, Urban Center,
                Metropolis, Country
              </p>
            </div>

            {/* Feedback Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-primary">
                Send Us Your Feedback
              </h3>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-teal-500 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-teal-500 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-teal-500 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white py-2 px-4 rounded-md hover:bg-rose-400 transition"
                >
                  Submit
                </button>
              </form>
            </div>
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

export default Contact;
