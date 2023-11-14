import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { db } from "../firebase";
import { Link } from "react-router-dom";
import { FcHome } from "react-icons/fc";
import ListingItem from "../components/ListingItem";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchUserListings();
  }, [auth.currentUser.uid]);

  return (
    <>
      <section className="max-w-6xl mx-auto mt-6 px-4 flex justify-center items-center flex-col">
        <h2 className="font-bold text-3xl mb-6">My Profile</h2>
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
          <button
            type="submit"
            className="w-full bg-blue-600 px-6 py-2 rounded text-md font-medium text-white hover:bg-blue-700 active:bg-blue-800 transition duration-200 ease-in-out shadow-sm hover:shadow-md active:shadow-lg uppercase"
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center gap-2"
            >
              <FcHome className="text-3xl bg-red-200 rounded-full border p-1" />
              sell or rent your home
            </Link>
          </button>
        </div>
      </section>
      <section className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold">My Listings</h2>
            <ul className="my-6 sm:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
};

export default Profile;
