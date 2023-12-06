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

  const handleOnSubmit = async (userName, event) => {
    event.preventDefault();
    const { avatar } = event.target.elements;

    const payload = {
      avatar: avatar.value,
    };

    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/auction/profiles/${userName}/media`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Avatar updated successfully:", responseData);
        // You might want to update local state or perform other actions here
        alert("Avatar updated successfully");
        localStorage.setItem("avatar", responseData.avatar);
        window.location.reload();
      } else {
        // Handle non-successful responses (e.g., display an error message)
        const errorData = await response.json();
        console.error("Error updating avatar:", errorData);
        alert(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      alert("Error updating avatar. Please try again later.");
    }
  };

  useEffect(() => {
    // Define an async function to fetch user details
    const fetchUserData = async () => {
      try {
        const data = await profileDetails(userName);
        setUserData(data);

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
          <div className="w-20">
            <img src={userData.avatar} alt="" />
          </div>

          <div className="flex flex-row">
            <form
              onSubmit={(event) => handleOnSubmit(userName, event)}
              className="flex flex-row space-y-6"
              action="#"
              method="PUT"
            >
              <input name="avatar" id="avatar" type="text" />
              <button type="submit">Post</button>
            </form>
          </div>

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
