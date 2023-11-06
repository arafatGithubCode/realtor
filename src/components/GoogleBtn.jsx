import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";

import { useNavigate } from "react-router";

const GoogleBtn = () => {
  const navigate = useNavigate();
  const handleGoogleSubmit = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //check for the user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Couldn't authorize with google");
    }
  };

  return (
    <>
      <button
        onClick={handleGoogleSubmit}
        type="button"
        className="w-full flex justify-center items-center text-white uppercase py-2 rounded font-semibold bg-red-700 hover:bg-red-800 active:bg-red-900 transition duration-200 ease-in-out shadow-md hover:shadow-lg active:shadow-lg"
      >
        <FcGoogle className="text-xl bg-white rounded-full mr-2" />
        continue with google
      </button>
    </>
  );
};

export default GoogleBtn;
