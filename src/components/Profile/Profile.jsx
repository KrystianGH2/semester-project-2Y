import { useState, useEffect } from "react";
import { profileDetails } from "../../lib/api";
import coin from "../../assets/images/coin.png";

function Profile() {
  const userName = localStorage.getItem("username");
  const [userData, setUserData] = useState(null);
  const [userCredits, setUserCredits] = useState(0);

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

        setUserCredits(data.credits); // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    // Call the async function
    fetchUserData();
  }, [userName]);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-28">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="font-bold text-2xl tracking-wider pb-12">Profile</h1>
        {userData && (
          <div className="flex flex-col justify-center items-center border p-6">
            <div className="w-20 flex justify-center items-center">
              <img
                className="border w-28 rounded-full items-center"
                src={userData.avatar}
                alt=""
              />
            </div>
            <p>{userData.name}</p>
            <p>@{userData.email}</p>
            <span className="flex flex-row justify-center items-center">
              {userCredits} <img className="w-5 ml-3" src={coin} alt="" />
            </span>
            <p>Email: {userData._count.listings}</p>

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
          </div>
        )}{" "}
      </div>
    </div>
  );
}

export default Profile;
