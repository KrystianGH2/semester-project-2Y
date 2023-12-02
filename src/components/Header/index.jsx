// Header.jsx
import { useState, useEffect } from "react";
import HeaderUI from "./headerUi";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [getUserCredits, setGetUserCredits] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userName = localStorage.getItem("username");

  useEffect(() => {
    const savedAvatarUrl = localStorage.getItem("avatar");

    if (savedAvatarUrl) {
      setAvatarUrl(savedAvatarUrl);
    } else {
      setAvatarUrl("/src/avatar/profileIcon.jpg");
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/auction/profiles/${userName}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          const userCredits = userData.credits;
          setGetUserCredits(userCredits);
          setIsLoggedIn(true);
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userName]);

  const logOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("credits");
    localStorage.removeItem("avatar");
    setIsLoggedIn(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleProfileMenuToggle = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <>
      {" "}
      <HeaderUI
        isMenuOpen={isMenuOpen}
        handleMenuToggle={handleMenuToggle}
        isLoggedIn={isLoggedIn}
        getUserCredits={getUserCredits}
        avatarUrl={avatarUrl}
        handleProfileMenuToggle={handleProfileMenuToggle}
        isProfileMenuOpen={isProfileMenuOpen}
        logOut={logOut}
        isLoading={isLoading}
      />
    </>
  );
};

export default Header;
