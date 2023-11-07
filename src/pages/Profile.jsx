import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [formData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const handleSignOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <section className="max-w-6xl mx-auto mt-6 px-4 flex justify-center items-center flex-col">
        <h2 className="font-bold text-3xl mb-6">Profile</h2>
        <div className="w-full md:w-[50%]">
          <form>
            <input
              type="text"
              name="name"
              value={name}
              className="w-full px-4 py-2 bg-white rounded border border-gray-300 disabled transition ease-in-out text-xl text-gray-700 mb-6"
            />
            <input
              type="email"
              name="email"
              value={email}
              className="w-full px-4 py-2 bg-white rounded border border-gray-300 disabled transition ease-in-out text-xl text-gray-700 mb-6"
            />
            <div className="flex justify-between text-sm sm:text-lg mb-6 items-center">
              <p className="flex justify-center items-center">
                Do you want to change your name?
                <span className="ml-1 text-red-600 hover:text-red-700 transition duration-200 ease-in-out cursor-pointer">
                  Edit
                </span>
              </p>
              <p
                onClick={handleSignOut}
                className="text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
