import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after sign-in
import { auth } from "../../firebase"; // Adjust the path to your firebase config
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; // Import Firebase sign-in functions

function SignIn() {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate(); // Hook to navigate after sign-in

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      await signInWithEmailAndPassword(auth, email, password); // Sign in with Firebase
      navigate("/"); // Redirect to the main page after successful sign-in
    } catch (err) {
      setError(err.message); // Set error message in case of failure
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider(); // Create a Google provider instance

    try {
      await signInWithPopup(auth, provider); // Sign in with Google
      navigate("/"); // Redirect to the main page after successful sign-in
    } catch (err) {
      setError(err.message); // Set error message in case of failure
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">Sign In</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
              placeholder="Enter your email"
              value={email} // Bind input value to state
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
              required // Make this field required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
              placeholder="Enter your password"
              value={password} // Bind input value to state
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
              required // Make this field required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">Or</p>
          <button
            onClick={signInWithGoogle} // Trigger Google sign-in
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mt-4"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
