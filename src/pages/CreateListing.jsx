import { useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";
import { useNavigate } from "react-router";
const CreateListing = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnish: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnish,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
    images,
  } = formData;

  const onChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    //files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    //text/boolean/number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (+discountedPrice >= +regularPrice) {
      setLoading(false);
      toast.error("Discounted price should be less then regular price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("Maximum 6 images are allowed");
      return;
    }

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) =>
        storeImage(image).catch((error) => {
          setLoading(false);
          toast.error("Images are not uploaded");
          return;
        })
      )
    );

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
    };
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Listing created");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="max-w-md mx-auto px-3">
      <h2 className="text-3xl font-bold text-center mt-6">Create a Listing</h2>
      <form onSubmit={onSubmit}>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex gap-4 items-center">
          <button
            className={`text-sm font-medium px-6 py-3 shadow-md rounded hover:shadow-lg active:shadow-lg focus:shadow-lg w-full transition duration-200 ease-in-out uppercase ${
              type === "rent"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
            id="type"
            type="button"
            value="sell"
            onClick={onChange}
          >
            sell
          </button>
          <button
            className={`text-sm font-medium px-6 py-3 shadow-md rounded hover:shadow-lg active:shadow-lg focus:shadow-lg w-full transition duration-200 ease-in-out uppercase ${
              type === "sell"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
            id="type"
            type="button"
            value="rent"
            onClick={onChange}
          >
            Rent
          </button>
        </div>
        <p className="mt-5 text-xl font-semibold">Name</p>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter name"
          maxLength="32"
          minLength="10"
          value={name}
          required
          onChange={onChange}
          className="w-full px-4 py-2 rounded text-gray-700 border-gray-300 bg-white transition duration-200 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        <div className="flex items-center space-x-6 mb-6">
          <div>
            <p className="text-xl font-semibold">Beds</p>
            <input
              type="number"
              name="bedrooms"
              id="bedrooms"
              min="1"
              max="50"
              required
              value={bedrooms}
              onChange={onChange}
              className="w-full px-4 py-2 rounded text-gray-700 border-gray-300 bg-white transition duration-200 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
          <div>
            <p className="text-xl font-semibold">Baths</p>
            <input
              type="number"
              name="bathrooms"
              id="bathrooms"
              min="1"
              max="50"
              required
              value={bathrooms}
              onChange={onChange}
              className="w-full px-4 py-2 rounded text-gray-700 border-gray-300 bg-white transition duration-200 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
        </div>
        <p className="text-xl font-semibold">Parking spot</p>
        <div className="flex items-center gap-5 mb-6">
          <button
            id="parking"
            name="parking"
            type="button"
            onClick={onChange}
            value={true}
            className={`uppercase font-medium px-6 py-2 shadow rounded border-gray-300 hover:shadow-lg focus:shadow-lg active:shadow-lg w-full transition duration-200 ease-in-out ${
              !parking ? "bg-white text-black" : "bg-slate-500 text-white"
            }`}
          >
            yes
          </button>
          <button
            id="parking"
            name="parking"
            type="button"
            onClick={onChange}
            value={false}
            className={`uppercase font-medium px-6 py-2 shadow rounded border-gray-300 hover:shadow-lg focus:shadow-lg active:shadow-lg w-full transition duration-200 ease-in-out ${
              parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            no
          </button>
        </div>
        <p className="text-xl font-semibold">Furnished</p>
        <div className="mb-6 flex items-center gap-5">
          <button
            type="button"
            id="furnish"
            name="furnish"
            value={true}
            onClick={onChange}
            className={`font-medium uppercase px-5 py-2 shadow rounded hover:shadow-lg focus:shadow-lg active:shadow-lg border-gray-300 transition duration-200 ease-in-out w-full ${
              !furnish ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="furnish"
            name="furnish"
            value={false}
            onClick={onChange}
            className={`font-medium uppercase px-5 py-2 shadow rounded hover:shadow-lg focus:shadow-lg active:shadow-lg border-gray-300 transition duration-200 ease-in-out w-full ${
              furnish ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            no
          </button>
        </div>
        <p className="text-xl font-semibold">Address</p>
        <textarea
          name="address"
          id="address"
          placeholder="Address"
          onChange={onChange}
          value={address}
          minLength="10"
          maxLength="1000"
          className="w-full border-gray-300 rounded placeholder:text-xl mb-6 bg-white"
        ></textarea>
        <p className="text-xl font-semibold">Description</p>
        <textarea
          name="description"
          id="description"
          placeholder="Description"
          onChange={onChange}
          value={description}
          minLength="10"
          maxLength="1000"
          className="w-full mb-6 border-gray-300 rounded placeholder:text-xl"
        ></textarea>
        <p className="text-xl font-semibold">Offer</p>
        <div className="mb-6 flex gap-5">
          <button
            type="button"
            id="offer"
            name="offer"
            value={true}
            onClick={onChange}
            className={`uppercase font-medium px-6 py-2 shadow rounded w-full hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out ${
              !offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            yes
          </button>
          <button
            type="button"
            id="offer"
            name="offer"
            value={false}
            onClick={onChange}
            className={`uppercase font-medium px-6 py-2 shadow rounded w-full hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out ${
              offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            no
          </button>
        </div>
        <p className="font-semibold text-xl">Regular Price</p>
        <div className="w-full flex justify-start items-center space-x-6 mb-6">
          <input
            type="number"
            name="regularPrice"
            id="regularPrice"
            onChange={onChange}
            value={regularPrice}
            min="50"
            className="text-center border-gray-300 rounded px-6 py-2 w-40 text-xl focus:border-slate-700"
          />
          {type === "rent" && (
            <div>
              <p className="w-full text-md whitespace-nowrap">$ / Month</p>
            </div>
          )}
        </div>
        {offer && (
          <div className="mb-6">
            <p className="text-xl font-semibold">Discounted Price</p>
            <input
              type="number"
              id="discountedPrice"
              onChange={onChange}
              value={discountedPrice}
              min="0"
              className="text-center text-xl border-gray-300 w-2/4 rounded px-6 py-2"
            />
          </div>
        )}
        <p className="font-semibold text-xl">Images</p>
        <p className="text-sm text-gray-500">
          The first image will be the cover (max 6).
        </p>
        <input
          type="file"
          id="images"
          onChange={onChange}
          required
          multiple
          accept=".jpg, .png, .jpeg"
          className="w-full mb-6 bg-white px-6 py-1 rounded shadow hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out text-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-600 w-full mb-6 px-6 py-2 rounded uppercase text-white hover:bg-blue-700 focus:bg-blue-800 active:bg-blue-900 transition duration-200 ease-in-out shadow hover:shadow-lg focus:shadow-lg active:shadow-lg"
        >
          create listing
        </button>
      </form>
    </main>
  );
};

export default CreateListing;
