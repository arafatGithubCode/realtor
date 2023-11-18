import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Home = () => {
  //places for offer
  const [offerListings, setOfferListings] = useState(null);
  //places for rent
  const [rentListing, setRentListing] = useState(null);
  //places for sale
  const [saleListing, setSaleListing] = useState(null);

  //places for offer
  useEffect(() => {
    const fetchListing = async () => {
      try {
        //get reference
        const listingsRef = collection(db, "listings");

        //create the query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        ); //desc= descending (lastly listing comes first)

        //execute the query
        const docSnap = await getDocs(q);
        const listings = [];
        docSnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListing();
  }, []);

  //places for rent
  useEffect(() => {
    const fetchListing = async () => {
      try {
        //get reference
        const listingsRef = collection(db, "listings");

        //create the query
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        ); //desc= descending (lastly listing comes first)

        //execute the query
        const docSnap = await getDocs(q);
        const listings = [];
        docSnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListing(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListing();
  }, []);

  //places for sale
  useEffect(() => {
    const fetchListing = async () => {
      try {
        //get reference
        const listingsRef = collection(db, "listings");

        //create the query
        const q = query(
          listingsRef,
          where("type", "==", "sell"),
          orderBy("timestamp", "desc"),
          limit(4)
        ); //desc= descending (lastly listing comes first)

        //execute the query
        const docSnap = await getDocs(q);
        const listings = [];
        docSnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListing(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListing();
  }, []);

  return (
    <>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-3xl font-semibold mt-6">Recent offers</h2>
            <Link to="/offers">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {offerListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {rentListing && rentListing.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-3xl font-semibold mt-6">
              Places for rent
            </h2>
            <Link to="/category/rent">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more places for rent
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rentListing.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {saleListing && saleListing.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-3xl font-semibold mt-6">
              Places for sale
            </h2>
            <Link to="/category/sale">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more places for sale
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {saleListing.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
