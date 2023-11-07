import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { db } from "../firebase";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const handleSignOut = () => {
    auth.signOut();
    navigate("/");
  };

  const handleChangeDetail = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update displayName in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile name updated");
    } catch (error) {
      toast.error("Could not update the profile name!");
    }
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
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={handleChangeDetail}
              className={`w-full px-4 py-2 bg-white rounded border border-gray-300 transition ease-in-out text-xl text-gray-700 mb-6 ${
                changeDetail && "bg-red-200 focus:bg-red-200"
              }`}
            />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              disabled={!changeDetail}
              className="w-full px-4 py-2 bg-white rounded border border-gray-300 transition ease-in-out text-xl text-gray-700 mb-6"
            />
            <div className="flex justify-between text-sm sm:text-lg mb-6 items-center">
              <p className="flex justify-center items-center">
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetail && handleSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="ml-1 text-red-600 hover:text-red-700 transition duration-200 ease-in-out cursor-pointer"
                >
                  {changeDetail ? "Apply Changes" : "Edit"}
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
