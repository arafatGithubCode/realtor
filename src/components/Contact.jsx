import PropTypes from "prop-types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Contact = ({ userRef, listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Couldn't get landlord data");
      }
    };
    getLandlord();
  }, [userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {landlord !== null && (
        <div className="flex flex-col w-full">
          <p>
            Contact {landlord.name} for the {listing.name.toLowerCase()}
          </p>
          <div className="mt-3 mb-6">
            <textarea
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={onChange}
              className="text-gray-700 bg-white px-4 py-2 rounded w-full border-1 border-gray-300 focus:border-slate-600 focus:text-gray-700 focus:bg-white shadow-md focus:shadow-lg"
            ></textarea>
          </div>
          <a
            href={`mailto:${landlord.email}?subject=${listing.name}&body=${message}`}
          >
            <button className="bg-blue-700 text-white w-full px-4 py-2 rounded uppercase font-semibold hover:bg-blue-800 focus:bg-blue-900 mb-6 transition duration-200 ease-in-out">
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
};

Contact.propTypes = {
  userRef: PropTypes.any,
  listing: PropTypes.any,
};

export default Contact;
