import React from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

const Modal = ({ title, body, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-96 rounded-2xl border border-[var(--line)] bg-white p-6 shadow-2xl shadow-black/10">

        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
          <h2 className="flex items-center gap-2.5 text-xl font-bold text-[var(--ink)]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--violet-soft)] text-[var(--violet)]">
              <FaCheckCircle className="text-sm" />
            </span>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--ink-soft)] transition hover:text-[var(--ink)]"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        <div className="mt-4 text-[var(--ink-soft)]">{body}</div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-[var(--ink)] px-4 py-2 font-semibold text-white transition hover:bg-[var(--violet)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;