import { useState } from "react";
import CreateUI from "./createListingUi";

function Create() {
  // State to manage form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    tags: [],
    date: "",
  });

  // Handle input changes in the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Special handling for tags input
    if (name === "tags") {
      const tagsArray = value.split(",").map((tag) => tag.trim());
      setFormData({ ...formData, [name]: tagsArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to create a new listing
      const res = await fetch(
        "https://api.noroff.dev/api/v1/auction/listings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description || "",
            tags: formData.tags || [],
            media: formData.image ? [formData.image] : [],
            endsAt: formData.date,
          }),
        }
      );

      // Check if the request was successful
      if (!res.ok) {
        const errorData = await res.json();
        console.error(`Error: ${errorData.message}`);
      } else {
        // Display success message
        alert("Listing created successfully");

        // Save the new listing to local storage (can be used to get the list again to show to profile page -> my listings)
        const storedListings =
          JSON.parse(localStorage.getItem("myListings")) || [];
        const newListing = {
          title: formData.title,
          description: formData.description || "",
          tags: formData.tags || [],
          image: formData.image || "",
          date: formData.date,
        };

        storedListings.push(newListing);
        localStorage.setItem("myListings", JSON.stringify(storedListings));

        // Reset the form after successful submission
        setFormData({
          title: "",
          description: "",
          image: "",
          tags: [],
          date: "",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <CreateUI
      formData={formData}
      handleInputChange={handleInputChange}
      handleOnSubmit={handleOnSubmit}
    />
  );
}

export default Create;
