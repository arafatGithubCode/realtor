import PropTypes from "prop-types";

const ListingItem = ({ listing, id }) => {
  return <div>{listing.name}</div>;
};

ListingItem.propTypes = {
  id: PropTypes.any,
  listing: PropTypes.string,
};

export default ListingItem;
