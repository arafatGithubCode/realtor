import { FcGoogle } from "react-icons/fc";
const GoogleBtn = () => {
  return (
    <>
      <button className="w-full flex justify-center items-center text-white uppercase py-2 rounded font-semibold bg-red-700 hover:bg-red-800 active:bg-red-900 transition duration-200 ease-in-out shadow-md hover:shadow-lg active:shadow-lg">
        <FcGoogle className="text-xl bg-white rounded-full mr-2" />
        continue with google
      </button>
    </>
  );
};

export default GoogleBtn;
