import React, { useState } from "react";
import { db } from "../firebase"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setSuccess(false); // Reset success message when user edits the form
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Add form data to Firestore
      await addDoc(collection(db, "contacts"), formData);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      console.error("Error submitting contact form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-5xl bg-white shadow-md flex flex-col md:flex-row">
        {/* Left Section: Contact Form */}
        <div className="flex-1 p-8">
          <h1 className="text-4xl font-bold mb-4 text-center md:text-left">Contact Us</h1>
          <p className="text-gray-500 mb-6 text-center md:text-left">
            Feel free to contact us any time. We will get back to you as soon as we can!
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full p-3 border border-gray-300 rounded h-32"
              required
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 font-bold uppercase rounded ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-sky-500 text-white hover:bg-sky-800"
              }`}
            >
              {loading ? "Sending..." : "Send"}
            </button>
            {success && (
              <p className="text-green-500 text-center mt-4">
                Your message has been sent successfully!
              </p>
            )}
          </form>
        </div>

        {/* Right Section: Contact Info */}
        <div className="flex-1 bg-blue-800 text-white p-6 flex flex-col justify-center items-center md:items-start">
          <div className="m-10 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4">Contact Info</h2>
            <div className="space-y-4">
              <p className="flex items-center justify-center md:justify-start space-x-4">
                <span>📧</span>
                <span>info@getintouch.we</span>
              </p>
              <p className="flex items-center justify-center md:justify-start space-x-4">
                <span>📞</span>
                <span>(+62) 568-9146-3566</span>
              </p>
              <p className="flex items-center justify-center md:justify-start space-x-4">
                <span>📍</span>
                <span>14 Greenroad St.</span>
              </p>
              <p className="flex items-center justify-center md:justify-start space-x-4">
                <span>🕒</span>
                <span>09:00 - 20:00</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
