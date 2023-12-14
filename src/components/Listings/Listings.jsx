// Item.js
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ItemUi from "./ItemUi";

function Item() {
  const { itemId } = useParams();
  const url = `https://api.noroff.dev/api/v1/auction/listings/${itemId}?_seller=true&_bids=true`;

  const [userData, setUserData] = useState(null);
  const [bidAmount, setBidAmount] = useState(""); // State to store the bid amount
  const [errorResponse, setErrorResponse] = useState(""); // State to store the error response
  const [showPopUp, setShowPopUp] = useState(null); // State to show the popUp when error on bidding occurs
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // this checks if the auhtoken is in the local storage, and if so, the user can make a bid on items
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = useCallback(async () => {
    try {
      const res = await fetch(url);
      const fetchedData = await res.json();
      setUserData(fetchedData);
    } catch (error) {
      setErrorResponse(`Failed to fetch data: ${error.message}`);
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
    };

    checkUserLogin();

    fetchUserDetails();
  }, [fetchUserDetails]);

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

  // this checks if the value that is written in the input field is a number
  const handleBidSubmit = async () => {
    const bidAmountNumber = parseFloat(bidAmount);
    if (isNaN(bidAmountNumber) || bidAmountNumber <= 0) {
      console.error("Invalid bid amount. Please enter a valid number.");
      return;
    }

    try {
      const bidUrl = `https://api.noroff.dev/api/v1/auction/listings/${itemId}/bids?_seller=true&_bids=true`;

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

      if (response.ok) {
        alert("Bid successfully added!");

        fetchUserDetails();
        window.location.reload();
      } else {
        const errorResponse = await response.json();
        setErrorResponse(errorResponse);
        alert("Failed to add bid");
        setShowPopUp(true);
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
    <ItemUi
      loading={loading}
      errorResponse={errorResponse}
      userData={userData}
      bidAmount={bidAmount}
      isUserLoggedIn={isUserLoggedIn}
      isPopoverOpen={isPopoverOpen}
      showPopUp={showPopUp}
      highestBid={highestBid}
      handleBidAmountChange={(e) => setBidAmount(e.target.value)}
      handleBidSubmit={handleBidSubmit}
      setIsPopoverOpen={setIsPopoverOpen}
      setShowPopUp={setShowPopUp}
      calculateTimeLeft={calculateTimeLeft}
    />
  );
}

export default Item;
