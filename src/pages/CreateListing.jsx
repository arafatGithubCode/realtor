import { useState } from "react";

const CreateListing = () => {
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
    discount: 0,
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
    discount,
  } = formData;

  const onChange = () => {};
  return (
    <main className="max-w-md mx-auto px-3">
      <h2 className="text-3xl font-bold text-center mt-6">Create a Listing</h2>
      <form>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex gap-4 items-center">
          <button
            className={`text-sm font-medium px-6 py-3 shadow-md rounded hover:shadow-lg active:shadow-lg focus:shadow-lg w-full transition duration-200 ease-in-out uppercase ${
              type === "rent"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
            name="sell"
            id="sell"
            type="button"
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
            name="rent"
            id="rent"
            type="button"
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
            onChange={onChange}
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
            onChange={onChange}
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
          className="w-full border-gray-300 rounded placeholder:text-xl mb-6 bg-white"
        ></textarea>
        <p className="text-xl font-semibold">Description</p>
        <textarea
          name="description"
          id="description"
          placeholder="Description"
          onChange={onChange}
          value={description}
          className="w-full mb-6 border-gray-300 rounded placeholder:text-xl"
        ></textarea>
        <p className="text-xl font-semibold">Offer</p>
        <div className="mb-6 flex gap-5">
          <button
            type="button"
            id="offer"
            name="offer"
            value={offer}
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
            value={offer}
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
              name="discount"
              id="discount"
              onChange={onChange}
              value={discount}
              min="0"
              max="100"
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
          name="image"
          id="image"
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
