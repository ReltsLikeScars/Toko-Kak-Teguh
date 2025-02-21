import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Firestore
import { setDoc, doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Add username state
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState(null); // User state
  const [userProfile, setUserProfile] = useState(null); // User profile state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // Track user state with Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch user profile
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data());
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      // Handle Signup
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const newUser = userCredential.user;

        // Save username to Firestore
        await setDoc(doc(db, "users", newUser.uid), {
          username: username,
          email: newUser.email,
        });

        setUser(newUser);
        setUserProfile({ username: username, email: newUser.email });
        setIsModalOpen(false);
        navigate("/"); // Redirect to homepage
      } catch (error) {
        setError(error.message);
        console.error("Signup error:", error.message);
      }
    } else {
      // Handle Login
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const loggedInUser = userCredential.user;

        // Check if it's the admin account
        if (email === "sayaadmin@gmail.com" && password === "passwordnya123") {
          navigate("/admin"); // Redirect to admin page
        } else {
          // Fetch user profile from Firestore
          const userDoc = await getDoc(doc(db, "users", loggedInUser.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          }
          setUser(loggedInUser);
          setIsModalOpen(false);
          navigate("/"); // Redirect to homepage
        }
      } catch (error) {
        setError(error.message);
        console.error("Login error:", error.message);
      }
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setUserProfile(null);
        navigate("/"); // Redirect to homepage
      })
      .catch((error) => {
        setError(error.message);
        console.error("Logout error:", error.message);
      });
  };

  return (
    <div className="p-4">
      {user ? (
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-black">
           {userProfile?.username || "User"}
          </h3>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-black px-4 py-1 rounded-md hover:bg-red-700 ml-8"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-black px-2 py-1.5 rounded-md hover:bg-blue-700"
          >
            Login / Signup
          </button>
        </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md shadow-md w-96 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">
                {isSignup ? "Sign Up" : "Login"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAuth}>
              {isSignup && (
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username:
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    required
                  />
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password:
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-700 duration-200"
                >
                  {isSignup ? "Sign Up" : "Login"}
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-500 hover:underline"
              >
                {isSignup
                  ? "Already have an account? Login here"
                  : "Don't have an account? Sign up here"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
