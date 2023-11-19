import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { useParams } from "react-router-dom";

const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        //get ref
        const listingsRef = collection(db, "listings");
        //create query
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        //execute query
        const docSnap = await getDocs(q);
        //getting last listingItem
        const lastVisible = docSnap.docs[docSnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

        const listings = [];
        docSnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };
    fetchListing();
  }, [params.categoryName]);

  const fetchMoreListing = async () => {
    try {
      //get ref
      const listingsRef = collection(db, "listings");
      //create query
      const q = query(
        listingsRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(4)
      );
      //execute query
      const docSnap = await getDocs(q);
      //getting last listingItem
      const lastVisible = docSnap.docs[docSnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      const listings = [];
      docSnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listings");
    }
  };
  return (
    <section className="max-w-6xl mx-auto px-3">
      <h2 className="text-3xl text-center my-6">
        {params.categoryName === "rent" ? "Places for rent" : "Places for sale"}
      </h2>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </main>
          {lastFetchedListing && (
            <div className="flex justify-center items-center my-6">
              <button
                onClick={fetchMoreListing}
                className="bg-white px-3 py-1.5 rounded text-gray-700 font-semibold border-gray-300 hover:border-slate-600 border transition duration-150 ease-in-out"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p>
          There are no current places for{" "}
          {params.categoryName === "rent" ? "rent" : "sale"}
        </p>
      )}
    </section>
  );
};

export default Category;
