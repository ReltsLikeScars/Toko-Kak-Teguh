import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase"; // Import Firestore instance
import { collection, getDocs } from "firebase/firestore";
import Card from "./Cart"; // Pastikan komponen Card sudah ada dan benar diimport
import { FaClipboardList, FaBox, FaUsers } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [contactCount, setContactCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [users, setUsers] = useState([]); // State untuk menyimpan daftar pengguna
  const [loading, setLoading] = useState(true); // Loading state untuk memastikan data sudah diambil

  // Fetch the total number of contacts, products, users, and the users' data from Firestore
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch contacts count
        const contactSnapshot = await getDocs(collection(db, "contacts"));
        setContactCount(contactSnapshot.size);

        // Fetch products count (as an example)
        const productSnapshot = await getDocs(collection(db, "products"));
        setProductCount(productSnapshot.size);

        // Fetch users count and users data
        const userSnapshot = await getDocs(collection(db, "users"));
        setUserCount(userSnapshot.size);

        const userData = userSnapshot.docs.map((doc) => doc.data()); // Ambil data pengguna dari Firestore
        setUsers(userData); // Menyimpan data pengguna dalam state users

        setLoading(false); // Set loading to false after fetching the data
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">Welcome to the Admin Dashboard</h2>

      {/* Cards for Contacts, Products, and Users */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div
            className="cursor-pointer"
            onClick={() => navigate("/reviews")} // Navigate to Review page
          >
            <Card icon={<FaClipboardList />} title="Contacts" value={contactCount} />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => navigate("/products")}
          >
            <Card icon={<FaBox />} title="Products" value={productCount} />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => navigate("/users")} // Navigate to Users page
          >
            <Card icon={<FaUsers />} title="Users" value={userCount} />
          </div>
        </div>
      )}

      {/* Table for Users */}
      <h3 className="ttext-xl sm:text-2xl font-semibold mt-6 mb-4 text-center sm:text-left">User List</h3>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-center">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
             
              <td className="p-4">{user.email}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
