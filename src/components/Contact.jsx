import React, { useState } from "react";
import emailjs from "emailjs-com";
import { CONTACT } from "../constants";
import { motion } from "framer-motion";
import Modal from "./Modal.jsx";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
  FaUser,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

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
      })
      .finally(() => setIsSending(false));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload();
  };

  return (
    <div className="border-b border-[var(--line)] pb-20 px-6">
      <div className="mt-4 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-eyebrow text-xs uppercase tracking-[0.35em] text-[var(--violet)]"
        >
          {"// get-in-touch"}
        </motion.span>
      </div>

      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="font-display mb-10 mt-4 text-center text-3xl uppercase tracking-tight text-[var(--ink)] lg:text-4xl"
      >
        Let's Build Something
      </motion.h2>

      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-[var(--ink-soft)] sm:flex-row sm:justify-center sm:gap-4">
        <motion.p
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
          className="font-ui flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm shadow-sm"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--violet-soft)] text-[var(--violet)]">
            <FaMapMarkerAlt className="text-xs" />
          </span>
          {CONTACT.address}
        </motion.p>
        <motion.p
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 1 }}
          className="font-ui flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm shadow-sm"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--violet-soft)] text-[var(--violet)]">
            <FaPhoneAlt className="text-xs" />
          </span>
          {CONTACT.phoneNo}
        </motion.p>
      </div>

      <div className="mt-4 text-center">
        <a
          href={`mailto:${CONTACT.email}`}
          className="font-ui inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm text-[var(--violet)] shadow-sm transition hover:bg-[var(--violet-soft)]"
        >
          <FaEnvelope /> {CONTACT.email}
        </a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-10 max-w-lg rounded-2xl border border-[var(--line)] bg-white p-8 shadow-xl shadow-black/5"
      >
        <h3 className="mb-6 flex items-center justify-center gap-2 text-center font-ui text-2xl font-semibold text-[var(--ink)]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--violet-soft)] text-[var(--violet)]">
            <FaPaperPlane className="text-sm" />
          </span>
          Send Me a Message
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="font-ui mb-1 flex items-center gap-2 text-sm font-medium text-[var(--ink-soft)]">
              <FaUser className="text-xs text-[var(--violet)]" /> Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] p-3 text-[var(--ink)] outline-none transition focus:border-[var(--violet)] focus:ring-2 focus:ring-[var(--violet)]/30"
            />
          </div>
          <div>
            <label htmlFor="email" className="font-ui mb-1 flex items-center gap-2 text-sm font-medium text-[var(--ink-soft)]">
              <FaEnvelope className="text-xs text-[var(--violet)]" /> Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] p-3 text-[var(--ink)] outline-none transition focus:border-[var(--violet)] focus:ring-2 focus:ring-[var(--violet)]/30"
            />
          </div>
          <div>
            <label htmlFor="message" className="font-ui mb-1 flex items-center gap-2 text-sm font-medium text-[var(--ink-soft)]">
              <FaPaperPlane className="text-xs text-[var(--violet)]" /> Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] p-3 text-[var(--ink)] outline-none transition focus:border-[var(--violet)] focus:ring-2 focus:ring-[var(--violet)]/30"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSending}
            className="font-ui flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--ink)] py-3 font-bold text-white transition hover:bg-[var(--violet)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaPaperPlane className={isSending ? "animate-pulse" : ""} />
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.div>

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