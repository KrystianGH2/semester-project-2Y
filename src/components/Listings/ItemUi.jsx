// ItemUI.js
import PropTypes from "prop-types";
import { Popover } from "react-tiny-popover";
import coin from "../../assets/images/coin.png";
import Skeleton from "../skeleton";

function ItemUI({
  loading,
  errorResponse,
  userData,
  bidAmount,
  isUserLoggedIn,
  isPopoverOpen,
  showPopUp,
  highestBid,
  handleBidAmountChange,
  handleBidSubmit,
  setIsPopoverOpen,
  setShowPopUp,
  calculateTimeLeft,
}) {
  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <div className="mx-auto max-w-[1225px] px-6 lg:px-8 mt-36">
          <div className="flex m-auto gap-2 items-center mb-6">
            <small className="text-gray-500 font-medium">Auctions /</small>
            <small className="text-gray-500 font-medium  ">Listings /</small>
            <small className="text-gray-500 font-medium underline">
              {userData?.title &&
                userData.title.charAt(0).toUpperCase() +
                  userData.title.slice(1)}
            </small>
          </div>

          <div className="flex flex-col">
            {userData && (
              <div className="flex flex-row object-cover border rounded-lg overflow-hidden shadow-lg p-6 ">
                <div className=" flex w-full  flex-col md:flex-row ">
                  {" "}
                  <img
                    className="w-full md:w-[50%] h-96 object-cover"
                    src={userData.media}
                    alt={userData.title}
                  />
                  <div className="flex flex-col md:pl-12 pt-3">
                    <h1>
                      <span className="font-bolder tracking-wide font-bold text-2xl">
                        {userData.title && (
                          <span>
                            {userData.title.charAt(0).toUpperCase() +
                              userData.title.slice(1)}
                          </span>
                        )}
                      </span>
                    </h1>
                    <p className="pt-6 tracking-wide">
                      Seller:{" "}
                      {userData.seller.name && (
                        <span>
                          {userData.seller.name.charAt(0).toUpperCase() +
                            userData.seller.name.slice(1)}
                        </span>
                      )}
                    </p>
                    <p className="pt-6 tracking-wide pb-6">
                      Total Bids: {userData._count.bids}
                    </p>
                    <div className="flex flex-row gap-4">
                      {errorResponse ? (
                        <input
                          className=" rounded border-2 border-red-600 w-56 h-10  "
                          type="number"
                          placeholder="Enter Bid Amount"
                          value={bidAmount}
                          onChange={handleBidAmountChange}
                        />
                      ) : (
                        <input
                          className=" rounded border border-black w-56 h-10 focus:border-gray-500 focus:outline-none "
                          type="number"
                          placeholder="Enter Bid Amount"
                          value={bidAmount}
                          onChange={handleBidAmountChange}
                        />
                      )}

                      <div>
                        <Popover
                          isOpen={isPopoverOpen}
                          content={() => (
                            <div className="border p-4 rounded bg-slate-100 m-2 relative left-16 w-64">
                              <h3 className="font-medium text-md">
                                Oops! You are not logged in.
                              </h3>
                              <p>Please log in to place a bid.</p>
                            </div>
                          )}
                        >
                          {!isUserLoggedIn ? (
                            <button
                              type="button"
                              onMouseEnter={() => setIsPopoverOpen(true)}
                              onMouseLeave={() => setIsPopoverOpen(false)}
                              className="text-white mb-3 me-4 bg-orange-500 hover:bg-orange-400 hover:shadow-lg focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-gray-800"
                            >
                              Make Bid
                            </button>
                          ) : (
                            <button
                              onClick={handleBidSubmit}
                              type="button"
                              className="text-white mb-3 me-4 bg-orange-500 hover:bg-orange-500 hover:shadow-xl hover:transition focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-gray-800"
                            >
                              Make Bid
                            </button>
                          )}
                        </Popover>
                      </div>
                    </div>{" "}
                    {showPopUp && errorResponse && (
                      <div className="popup">
                        <div className="popup-content animate-shake">
                          <span
                            className="close cursor-pointer font-medium text-lg"
                            onClick={() => setShowPopUp(false)}
                          >
                            &times;
                          </span>
                          <p className="  bg-transparent border-red-700 rounded flex justify-center items-center w-full h-14 text-red-600 font-medium text-base border-[2px]">{`${errorResponse.errors[0].message}`}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col py-10">
              <h3 className="text-xl font-bold tracking-wide pb-6">
                Item Details
              </h3>
              <section>
                <ul className="w-full flex flex-col gap-4">
                  {highestBid && (
                    <>
                      <li className="pb-4 max-w-[55%]">
                        <span className="font-medium">Description</span> <br />{" "}
                        {userData.description}
                      </li>
                      <li className="pb-4">
                        <span className="font-medium">Highest bid by</span>{" "}
                        <br />
                        {highestBid.bidderName && (
                          <span>
                            {highestBid.bidderName.charAt(0).toUpperCase() +
                              highestBid.bidderName.slice(1)}
                          </span>
                        )}
                      </li>
                      <li className="pb-4">
                        {" "}
                        <span className="font-medium">
                          Highest bid amount
                        </span>{" "}
                        <br />{" "}
                        <div className="flex flex-row gap-2  items-center">
                          {highestBid.amount}{" "}
                          <img className="w-4 h-[18px]" src={coin} alt="" />
                        </div>
                      </li>
                      <li className="pb-4">
                        {" "}
                        <span className="font-medium">
                          Time left
                        </span> <br /> {calculateTimeLeft(userData.endsAt)}
                      </li>
                    </>
                  )}
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

ItemUI.propTypes = {
  loading: PropTypes.bool.isRequired,
  errorResponse: PropTypes.string,
  userData: PropTypes.object,
  bidAmount: PropTypes.string,
  isUserLoggedIn: PropTypes.bool,
  buttonHover: PropTypes.string,
  isPopoverOpen: PropTypes.bool,
  showPopUp: PropTypes.bool,
  highestBid: PropTypes.object,
  handleBidAmountChange: PropTypes.func.isRequired,
  handleBidSubmit: PropTypes.func.isRequired,
  setIsPopoverOpen: PropTypes.func.isRequired,
  setShowPopUp: PropTypes.func.isRequired,
  calculateTimeLeft: PropTypes.func.isRequired,
};

export default ItemUI;
