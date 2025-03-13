import React, { useState } from "react";
import emailjs from "emailjs-com";
import { CONTACT } from "../constants";
import { motion } from "framer-motion";
import Modal from "./Modal.jsx";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_a9jl199",
        "template_dfuqm7n",
        e.target,
        "EUE2coetnuOQWq8KW"
      )
      .then(() => {
        setShowModal(true);
      })
      .catch(() => {
        alert("Failed to send message. Please try again later.");
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload(); 
  };
  

  return (
    <div className="border-b border-neutral-900 pb-20 px-6">
    
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-10 text-center text-4xl font-bold text-white"
      >
        Get in Touch
      </motion.h2>

    
      <div className="text-center tracking-tighter text-lg text-gray-300">
        <motion.p
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
          className="my-2"
        >
          📍 {CONTACT.address}
        </motion.p>
        <motion.p
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 1 }}
          className="my-2"
        >
          📞 {CONTACT.phoneNo}
        </motion.p>
        <a
          href={`mailto:${CONTACT.email}`}
          className="text-cyan-400 underline hover:text-cyan-300 transition"
        >
          ✉️ {CONTACT.email}
        </a>
      </div>

     
      <div className="mt-10 max-w-lg mx-auto bg-neutral-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          Send Us a Message
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-400 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-400 mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-400 mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 rounded-lg transition"
          >
            Send Message
          </button>
        </form>
      </div>

    
      {showModal && (
        <Modal
          title="Thank You!"
          body="I received your message 😊."
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Contact;
