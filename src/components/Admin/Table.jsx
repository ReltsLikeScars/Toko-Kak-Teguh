import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "contacts"), (snapshot) => {
      const fetchedReviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(fetchedReviews);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteReview = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Reviews</h1>
      <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
        {loading ? (
          <p className="text-gray-500 text-center">Loading reviews...</p>
        ) : reviews.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-100 text-xs sm:text-sm">
                  <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Email</th>
                  <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Message</th>
                  <th className="border border-gray-300 px-2 sm:px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50 text-xs sm:text-sm">
                    <td className="border border-gray-300 px-2 sm:px-4 py-2 whitespace-nowrap">{review.name || "Anonymous"}</td>
                    <td className="border border-gray-300 px-2 sm:px-4 py-2 whitespace-nowrap">{review.email || "No email"}</td>
                    <td className="border border-gray-300 px-2 sm:px-4 py-2 max-w-xs truncate">{review.message || "No message"}</td>
                    <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-xs sm:text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default Review;
