/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";
import GoogleBtn from "../components/GoogleBtn";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <section>
      <h2 className="text-3xl text-center mt-4 font-bold">Sign In</h2>
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
              placeholder="example@gmail.com"
              value={email}
              id="email"
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded text-xl border-gray-300 text-gray-700 transition ease-in-out bg-white mb-6"
            />
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                id="password"
                name="password"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded text-xl border-gray-300 text-gray-700 transition ease-in-out bg-white"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Don't have an account?
                <Link
                  to="/sign-up"
                  className="text-red-600 hover:text-red-700 transition duration-200 ml-1 ease-in-out"
                >
                  Register
                </Link>
              </p>
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="text-sm font-medium shadow-md w-full bg-blue-600 text-white py-2 uppercase rounded hover:bg-blue-700 transition duration-200 ease-in-out active:bg-blue-800 hover:shadow-lg"
            >
              sign in
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

export default SignIn;
