/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useState } from "react";
import GoogleBtn from "../components/GoogleBtn";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <section>
      <h2 className="text-3xl text-center mt-4 font-bold">Forgot Password</h2>
      <div className="flex flex-wrap justify-center items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fHww"
            alt="Key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              id="email"
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded text-xl border-gray-300 text-gray-700 transition ease-in-out bg-white mb-6"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Don't have an account?
                <Link
                  to="/sign-in"
                  className="text-red-600 hover:text-red-700 transition duration-200 ml-1 ease-in-out"
                >
                  Register
                </Link>
              </p>
              <Link
                to="/sign-in"
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
              >
                Sign in instead
              </Link>
            </div>
            <button
              type="submit"
              className="text-sm font-medium shadow-md w-full bg-blue-600 text-white py-2 uppercase rounded hover:bg-blue-700 transition duration-200 ease-in-out active:bg-blue-800 hover:shadow-lg"
            >
              Send reset email
            </button>
            <div className="my-4 flex items-center before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="mx-4 text-center font-semibold">OR</p>
            </div>
            <GoogleBtn />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
