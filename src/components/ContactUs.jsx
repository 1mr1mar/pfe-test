import React from "react";

const ContactUs = () => {
  return (
    <section className=" relative bg-green-ziti">
      <div className="absolute z-1 top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-1 top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-1 top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-1 top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="w-full h-80 mt-8">
          <iframe
            className="w-full z-30 h-full"
            src="https://www.google.com/maps/place/Bni+Makada,+Tanger/@35.7508357,-5.8365818,17z/data=!3m1!4b1!4m6!3m5!1s0xd0b873fbf977735:0x25a7f4a211b8b6c9!8m2!3d35.7508357!4d-5.8340015!16s%2Fg%2F11gpnf0001?entry=ttu&g_ep=EgoyMDI1MDMxNi4wIKXMDSoASAFQAw%3D%3D"
            allowFullScreen=""
            loading="lazy"
            ></iframe>
        </div >
      

      <div className=" flex-1/2 px-6 py-16 ml-50 mr-70 ">
        
        <p className="text-lg text-white">Write to us</p>
        <h1 className="text-4xl font-semibold text-white mb-6">Contact Us</h1>
        <form className="z-30">
          <input
            type="text"
            placeholder="Name"
            className="w-full border-2 border-yellow-gold1 p-3 mb-4 bg-transparent text-white"
            />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border-2 border-yellow-gold1 bg-transparent text-white"
            />
          <textarea
            placeholder="Message"
            className="w-full p-3 mb-4 border-2 border-yellow-gold1 bg-transparent text-white"
            ></textarea>
          <button
            type="submit"
            className="p-3 ml-60 pl-10 pr-10 border-2 border-yellow-gold1 bg-gold-500 text-white hover:bg-gold-600"
            >
            Send
          </button>
        </form>
      </div>
        
      
    </section>
  );
};

export default ContactUs;
