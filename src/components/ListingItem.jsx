import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { MdLocationPin } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  return (
    <li className="relative flex flex-col justify-between items-center bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-150 ease-in-out m-[10px]">
      <Link className="contents" to={`category/${listing.type}/${id}`}>
        <img
          className="w-full h-[170px] rounded object-cover hover:scale-105 transition-scale duration-200 ease-in-out"
          loading="lazy"
          src={listing.imgUrls[0]}
          alt="Image"
        />

        <Moment
          className="absolute top-2 left-2 bg-[#3377cc] text-white text-xs font-semibold uppercase rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {listing.timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <div className="flex items-center gap-1">
            <MdLocationPin className="w-4 h-4 text-green-600" />
            <p className="text-sm font-semibold mb-[2px] truncate text-gray-600">
              {listing.address}
            </p>
          </div>
          <p className="text-xl truncate font-semibold">{listing.name}</p>
          <p className="text-[#457b9d] font-semibold my-2">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace((/\B(?=(\d{3})+(?!\d))/g, ","))}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <p className="text-xs font-bold">
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 bed"}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-xs font-bold">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : "1 Bath"}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (
        <FaRegTrashAlt
          className="absolute bottom-2 right-2 cursor-pointer text-red-500 h-[14px]"
          onClick={() => onDelete(listing.id)}
        />
      )}
      {onEdit && (
        <MdEdit
          className="absolute bottom-2 right-8 cursor-pointer text-black h-4"
          onClick={() => onEdit(listing.id)}
        />
      )}
    </li>
  );
};

ListingItem.propTypes = {
  id: PropTypes.any,
  onDelete: PropTypes.any,
  onEdit: PropTypes.any,
  listing: PropTypes.shape({
    type: PropTypes.any,
    imgUrls: PropTypes.arrayOf(PropTypes.any),
    timestamp: PropTypes.any,
    address: PropTypes.any,
    name: PropTypes.any,
    discountedPrice: PropTypes.any,
    regularPrice: PropTypes.any,
    offer: PropTypes.any,
    bedrooms: PropTypes.any,
    bathrooms: PropTypes.any,
    id: PropTypes.any,
  }),
};

export default ListingItem;
