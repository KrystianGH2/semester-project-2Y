import { useEffect, useState } from "react";
import AuctionUi from "./AuctionUi";

function Listings() {
  const [listings, setListings] = useState([]);
  const [displayCount, setDisplayCount] = useState(12);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [sortOption, setSortOption] = useState("created");
  const [searchQuery, setSearchQuery] = useState("");
  const [originalListings, setOriginalListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInactive, setShowInactive] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const url = `https://api.noroff.dev/api/v1/auction/listings?_seller=true&_bids=true${
    showInactive ? "&_active=false" : "&_active=true"
  }`;

  const sortListings = (option) => {
    const sortedListings = [...originalListings];

    sortedListings.sort((a, b) => {
      switch (option) {
        case "created":
          return new Date(b.created) - new Date(a.created);
        case "oldest":
          return new Date(a.created) - new Date(b.created);
        case "highestBids":
          return b._count.bids - a._count.bids;
        case "lowestBids":
          return a._count.bids - b._count.bids;
        case "titleAZ":
          return a.title.localeCompare(b.title);
        case "titleZA":
          return b.title.localeCompare(a.title);
        case "inactive":
          return new Date(b.inactiveAt) - new Date(a.inactiveAt);
        default:
          return 0;
      }
    });

    setListings(sortedListings);
  };

  useEffect(() => {
    const getListings = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
          setListings(data);
          setOriginalListings(data);
        } else {
          setIsSuccess(true);
        }
      } catch (error) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    };
    getListings();
  }, [url]);

  useEffect(() => {
    sortListings(sortOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredListings = originalListings.filter((listing) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setListings(filteredListings);
  };

  const handleLoadMore = () => {
    setIsButtonLoading(true);

    // Simulate a delay of 2 seconds
    setTimeout(() => {
      setDisplayCount((prevCount) => prevCount + 12);
      setIsButtonLoading(false);
    }, 2000);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <AuctionUi
      isSuccess={isSuccess}
      loading={loading}
      listings={listings}
      displayCount={displayCount}
      isButtonLoading={isButtonLoading}
      sortOption={sortOption}
      searchQuery={searchQuery}
      handleSearch={handleSearch}
      handleSortChange={handleSortChange}
      handleLoadMore={handleLoadMore}
      formatDate={formatDate}
      setShowInactive={setShowInactive}
      showInactive={showInactive}
      setSearchQuery={setSearchQuery}
    />
  );
}

export default Listings;
