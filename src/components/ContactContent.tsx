import React from 'react';

const ContactContent = () => (
  <div className="w-full max-w-5xl p-4 sm:p-8 bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl animate-fade-in">
    <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 text-black">
      Contact Us
    </h1>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
      <div className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border-0 bg-gray-50/80 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="w-full border-0 bg-gray-50/80 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            placeholder="How can we help?"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full border-0 bg-gray-50/80 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>
      <div className="space-y-4 sm:space-y-6">
        <div className="h-full">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            rows={8}
            className="w-full h-[calc(100%-2rem)] border-0 bg-gray-50/80 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300 resize-none"
            placeholder="Your message here..."
          />
        </div>
      </div>
      <div className="col-span-1 md:col-span-2">
        <button
          type="submit"
          className="w-full bg-[#006699] text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-base
            hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
        >
          Send Message
        </button>
      </div>
    </form>
  </div>
);

export default ContactContent;
