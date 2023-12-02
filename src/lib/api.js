// userDetails.js
export const profileDetails = async (userName) => {
  try {
    const response = await fetch(
      `https://api.noroff.dev/api/v1/auction/profiles/${userName}?_listings=true`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    if (response.ok) {
      const userData = await response.json();
      // console.log(userData);
      return userData; // Return the fetched data
    } else {
      console.error("Failed to fetch user details");
      return null; // Return null or handle the error accordingly
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null; // Return null or handle the error accordingly
  }
};
