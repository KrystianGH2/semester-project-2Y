import { useState, useEffect } from "react";
import { profileDetails } from "../../lib/api";

function Profile() {
  const userName = localStorage.getItem("username");
  const [userData, setUserData] = useState(null);
  const [userCredits, setUserCredits] = useState(0);
  const [listings, setListings] = useState("");

  const handleOnClick = () => {
    console.log("clicked");
  };

  useEffect(() => {
    // Define an async function to fetch user details
    const fetchUserData = async () => {
      try {
        const data = await profileDetails(userName);
        setUserData(data);

        console.log("Listings>>>>>>>", data.listings[0]);
        // console.log(">>>>>>>>>>>>>>>>",data.credits)
        setUserCredits(data.credits); // Set the fetched data to the state

        setListings(data.listings);
        // console.log("Listings>>>>>>>", listings);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    // Call the async function
    fetchUserData();
  }, [userName]);

  return (
    <div>
      <h1 className="font-bold">Profile Page</h1>
      {userData && (
        <div>
          {/* Display user details using the fetched data */}
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Email: {userCredits}</p>
          <p>Email: {userData._count.listings}</p>
          {/* Add more details as needed */}
          {listings.map((item) => (
            <div key={item.id}>
              <p>{item.title}</p>
              <button onClick={handleOnClick}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
