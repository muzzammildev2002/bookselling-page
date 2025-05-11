import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"; 
import { auth, provider, db } from "../../firebase"; // Firebase config
import { doc, setDoc } from "firebase/firestore"; // Firestore

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Navigate back to the previous page
  const handleGoBack = () => navigate("/auth");

  // Handle Email and Password Sign-Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      navigate("/"); // Redirect to dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle Google Sign-Up
  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        displayName: user.displayName,
        createdAt: new Date(),
      });

      navigate("/"); // Redirect to dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Sign Up
        </h1>

        {/* Email/Password Sign-Up Form */}
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mb-4"
          >
            Sign Up with Email
          </button>
        </form>

        {/* Google Sign-Up Button */}
        <button
          onClick={handleGoogleSignUp}
          className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 mb-4"
        >
          Sign Up with Google
        </button>

        {/* Go Back Button */}
        <button
          onClick={handleGoBack}
          className="w-full bg-white text-blue-600 font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Go BACK
        </button>
      </div>
    </div>
  );
}

export default SignUp;
