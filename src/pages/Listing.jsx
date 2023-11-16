import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../components/Spinner";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css/bundle";

import { FaShare } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa";

const Listing = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        autoplay={{ delay: 3000 }}
        scrollbar={{ draggable: true }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-[300px] overflow-hidden"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[13%] right-[3%] z-10 bg-white w-12 h-12 border-gray-700 rounded-full flex justify-center items-center cursor-pointer shadow-md"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopied && (
        <p className="fixed top-[23%] right-[7%] z-10 bg-white rounded-md border-2 px-2 border-gray-500 font-semibold">
          Link copied
        </p>
      )}
      <div className="flex flex-col md:flex-row max-w-6xl lg:mx-auto m-4 p-4 shadow-lg rounded-lg lg:space-x-5">
        <div className="w-full h-[200px] lg:h-[400px]">
          <p className="text-2xl text-blue-900 font-bold">
            {listing.name} -{" "}
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / month"}
          </p>
          <p className="flex justify-start items-center gap-2 my-3">
            <FaMapMarkerAlt className="text-green-600" />
            <p className="text-sm font-bold md:text-md">{listing.address}</p>
          </p>
          <div className="w-[75%] flex justify-start items-center gap-4">
            <p className="bg-red-800 text-white p-1 rounded-md text-center font-semibold w-full max-w-[200px]">
              {listing.type === "rent" ? "For Rent" : "For Sale"}
            </p>
            <p className="bg-green-800 text-white p-1 font-semibold rounded-md w-full max-w-[200px] text-center md:text-sm lg:text-lg">
              {listing.offer && (
                <>${listing.regularPrice - listing.discountedPrice} discount</>
              )}
            </p>
          </div>
          <p className="my-3">
            <strong>Description - </strong>
            {listing.description}
          </p>
          <ul className="my-5 text-sm flex items-center space-x-2 sm:space-x-10 font-semibold">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="mr-1 text-xl" />
              {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="mr-1 text-xl" />
              {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="mr-1 text-xl" />
              {listing.parking ? "Parking Spot" : "No Parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="mr-1 text-xl" />
              {listing.furnish ? "Furnished" : "Not Furnished"}
            </li>
          </ul>
        </div>
        <div className="bg-blue-300 w-full h-[200px] lg:h-[400px] overflow-x-hidden z-10 mt-6"></div>
      </div>
    </main>
  );
};

export default Listing;
