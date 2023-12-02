import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Popover } from "react-tiny-popover";

function Item() {
  const { itemId } = useParams();
  console.log("itemId:", itemId);
  const url = `https://api.noroff.dev/api/v1/auction/listings/${itemId}?_seller=true&_bids=true`;
  const [userData, setUserData] = useState(null);
  const [bidAmount, setBidAmount] = useState(""); // State to store the bid amount
  const [errorResponse, setErrorResponse] = useState(null); // State to store the error response
  const [showPopUp, setShowPopUp] = useState(null); // State to show the popUp when error on bidding occurs
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // this checks if the auhtoken is in the local storage, and if so, the user can make a bid on items
  const [buttonHover, setButtonHover] = useState(""); //
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const fetchUserDetails = useCallback(async () => {
    try {
      const res = await fetch(url);
      const fetchedData = await res.json();
      setUserData(fetchedData);
      console.log(fetchedData);
    } catch (error) {
      console.error("Error fetching user details:", error);
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

  //This calculates the time left for the item
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
      // console.log("Bid URL:", bidUrl);

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

      console.log("Response Status:", response.status);

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
    <div className="flex flex-col">
      <h2>User Profile</h2>
      {userData && (
        <div>
          <p>Title: {userData.title}</p>
          <p>Title: {calculateTimeLeft(userData.endsAt)}</p>
          <p>Description: {userData.description}</p>
          <img src={userData.media} alt={userData.title} />
          <p>Bid Amount: {bidAmount}</p>
          {errorResponse ? (
            <input
              className=" rounded-sm border-2 border-red-600 "
              type="number"
              placeholder="Enter Bid Amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
          ) : (
            <input
              className=" rounded border border-black"
              type="number"
              placeholder="Enter Bid Amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
          )}
          {/* <input
            type="number"
            placeholder="Enter Bid Amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          /> */}

          <div>
            <Popover
              isOpen={isPopoverOpen}
              position={["right"]}
              content={() => (
                <div className="border p-4 rounded bg-slate-100">
                  <h3 className="font-medium text-md">Oops! You are not logged in.</h3>
                  <p>
                    Please log in to place a bid.
                  </p>
                </div>
              )}
            >
              {!isUserLoggedIn ? (
                <button
                  type="button"
                  onMouseEnter={() => setIsPopoverOpen(true)}
                  onMouseLeave={() => setIsPopoverOpen(false)}
                  className="text-white mb-3 me-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Right popover
                </button>
              ) : (
                <button
                  onClick={handleBidSubmit}
                  type="button"
                  className="text-white mb-3 me-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Right popover
                </button>
              )}
            </Popover>
          </div>

          {showPopUp && errorResponse && (
            <div className="popup">
              <div className="popup-content">
                <span
                  className="close cursor-pointer"
                  onClick={() => setShowPopUp(false)}
                >
                  &times;
                </span>
                <p className="bg-black border-red-700 rounded flex justify-center items-center w-full h-14 text-white">{`${errorResponse.errors[0].message}`}</p>
              </div>
            </div>
          )}

          <div>
            <h3>Bid Details</h3>
            <section>
              <ul>
                <li>Total Bids: {userData._count.bids}</li>
                {/* Add other bid details if needed */}
                {highestBid && (
                  <div>
                    <p>Highest bid by: {highestBid.bidderName}</p>
                    <p>Highest bid amount: {highestBid.amount}</p>
                  </div>
                )}
              </ul>
            </section>
          </div>

          {/* Add other properties you want to display */}
        </div>
      )}
    </div>
  );
}

export default Item;
