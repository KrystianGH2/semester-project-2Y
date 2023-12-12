import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Popover } from "react-tiny-popover";
import coin from "../../assets/images/coin.png";
import Skeleton from "../skeleton";

function Item() {
  const { itemId } = useParams();
  const url = `https://api.noroff.dev/api/v1/auction/listings/${itemId}?_seller=true&_bids=true`;
  const [userData, setUserData] = useState(null);
  const [bidAmount, setBidAmount] = useState(""); // State to store the bid amount
  const [errorResponse, setErrorResponse] = useState(null); // State to store the error response
  const [showPopUp, setShowPopUp] = useState(null); // State to show the popUp when error on bidding occurs
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // this checks if the auhtoken is in the local storage, and if so, the user can make a bid on items
  const [buttonHover, setButtonHover] = useState(""); //
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = useCallback(async () => {
    try {
      const res = await fetch(url);
      const fetchedData = await res.json();
      setUserData(fetchedData);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  }, [url]);

  useEffect(() => {
    const checkUserLogin = () => {
      const token = localStorage.getItem("access_token");
      token ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);
      if (!token) {
        setButtonHover(buttonHover);
      }
    };

    checkUserLogin();

    fetchUserDetails();
  }, [fetchUserDetails, buttonHover]);

  // This calculates the time left for the item
  const calculateTimeLeft = (endsAt) => {
    const now = new Date();
    const endsAtDate = new Date(endsAt);
    const timeLeft = endsAtDate - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    return `${days} days, ${hours} hours, ${minutes} minutes`;
  };

  const handleBidSubmit = async () => {
    // this checks if the value that is written in the input field is a number
    const bidAmountNumber = parseFloat(bidAmount);
    if (isNaN(bidAmountNumber) || bidAmountNumber <= 0) {
      console.error("Invalid bid amount. Please enter a valid number.");
      return;
    }

    try {
      const bidUrl = `https://api.noroff.dev/api/v1/auction/listings/${itemId}/bids?_seller=true&_bids=true`;
      console.log("Bid URL:", bidUrl);

      const response = await fetch(bidUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.access_token}`,
        },
        body: JSON.stringify({
          amount: bidAmountNumber,
        }),
      });

      console.log("Response Status:", response);

      if (response.ok) {
        alert("Bid successfully added!");

        fetchUserDetails();
        window.location.reload();
      } else {
        const errorResponse = await response.json();
        setErrorResponse(errorResponse);
        alert("Failed to add bid");
        setShowPopUp(true);
        console.log("Response Status:", errorResponse);
      }
    } catch (error) {
      console.error("Error adding bid:", error);
    }
  };

  // Get the highest bid from the userData
  const highestBid =
    userData && userData.bids.length > 0
      ? userData.bids.reduce((prev, current) =>
          prev.amount > current.amount ? prev : current
        )
      : null;

  return (
    <>
      {" "}
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
                          onChange={(e) => setBidAmount(e.target.value)}
                        />
                      ) : (
                        <input
                          className=" rounded border border-black w-56 h-10 focus:border-gray-500 focus:outline-none "
                          type="number"
                          placeholder="Enter Bid Amount"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
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

export default Item;
