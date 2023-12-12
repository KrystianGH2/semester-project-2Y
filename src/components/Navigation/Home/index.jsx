import { useState, useEffect } from "react";
import HomeUi from "./HomeUi";
import SkeletonMain from "../../skeleton/skeletonMain";

const Home = () => {
  const [latestListings, setLatestListings] = useState([]);
  const [mostLikedListings, setMostLikedListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const url =
    "https://api.noroff.dev/api/v1/auction/listings?_active=true&_seller=true&_bids=true";

  useEffect(() => {
    const getListings = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
          const sortedListingsLatest = [...data].sort(
            (a, b) => new Date(b.created) - new Date(a.created)
          );
          const sortedListingsMostLiked = [...data].sort(
            (a, b) => b._count.bids - a._count.bids
          );

          setLatestListings(sortedListingsLatest.slice(0, 6));
          setMostLikedListings(sortedListingsMostLiked.slice(0, 6));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    getListings();
  }, [url]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      {loading ? (
        // While loading, render SkeletonMain with 6 cards
        <SkeletonMain count={6} />
      ) : (
        // After fetching data, render HomeUi
        <HomeUi
          latestListings={latestListings}
          mostLikedListings={mostLikedListings}
          formatDate={formatDate}
        />
      )}
    </>
  );
};

export default Home;
