import spinner from "../assets/svg/spinner.svg";
const Spinner = () => {
  return (
    <div className="flex justify-center items-center z-50 top-0 bottom-0 right-0 left-0 fixed bg-black bg-opacity-50">
      <div>
        <img src={spinner} alt="Loading" className="h-24" />
      </div>
    </div>
  );
};

export default Spinner;
