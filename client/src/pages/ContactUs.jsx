
// ContactUs.jsx
import React from "react";

const ContactUs = () => {
  return (
    <div className=" min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-medium">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 w-full px-4 py-2 border border-gray-500/40 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 w-full px-4 py-2 border border-gray-500/40 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                className="mt-1 w-full px-4 py-2 border border-gray-500/40 rounded-md focus:outline-none focus:ring-2 focus:blue-400"
                rows="5"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover: transition cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
          <div className="space-y-4 text-gray-600">
            <div>
              <span className="font-medium text-gray-700">Phone:</span> (123) 456-7890
            </div>
            <div>
              <span className="font-medium text-gray-700">Email:</span> support@example.com
            </div>
            <div>
              <span className="font-medium text-gray-700">Address:</span> 123 Main St, Cityville, USA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;