import { useState, useEffect } from "react";
import { profileDetails } from "../../lib/api";
import coin from "../../assets/images/coin.png";
import Modal from "../Modal/modal";

function Profile() {
  const userName = localStorage.getItem("username");
  const [userData, setUserData] = useState(null);
  const [userCredits, setUserCredits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [avatarInput, setAvatarInput] = useState("");

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      avatar: avatarInput,
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
        alert("Avatar updated successfully");
        localStorage.setItem("avatar", responseData.avatar);
        window.location.reload();
      } else {
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
    const fetchUserData = async () => {
      try {
        const data = await profileDetails(userName);
        setUserData(data);
        setUserCredits(data.credits);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserData();
  }, [userName]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-28">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="font-bold text-2xl tracking-wider pb-12">Profile</h1>
        {userData && (
          <div className="flex flex-col justify-center items-center border rounded p-6 w-full max-w-2xl">
            <div className="w-20 flex justify-center items-center">
              <img
                className="border w-28 h-20 rounded-full items-center"
                src={userData.avatar}
                alt=""
              />
            </div>
            <p className=" font-medium pt-2 text-[#696969]">{userData.name}</p>
            <p className=" font-medium pt-2 text-[#696969]">@{userData.email}</p>
            <span className="flex flex-row justify-center items-center font-medium pt-2 text-[#696969] ">
              {userCredits} <img className="w-5 ml-3" src={coin} alt="" />
            </span>
            <p className=" font-medium pt-2 text-[#696969]">Listings {userData._count.listings}</p>

            <div className="flex flex-row justify-center items-center">
              <button className="text-white bg-orange-500 hover:bg-orange-400 hover:shadow-lg focus:ring-4 mt-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center transition me-2" onClick={openModal}>Change Avatar</button>
            </div>
          </div>
        )}
      </div>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        onSubmit={handleOnSubmit}
        avatarInput={avatarInput}
        setAvatarInput={setAvatarInput}
      />
    </div>
  );
}

export default Profile;
