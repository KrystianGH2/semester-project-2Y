import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HomeUi = ({ latestListings, mostLikedListings, formatDate }) => (
  <>
    <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-36">
      <div className="flex flex-col max-w-3xl gap-4">
        <h1 className="mb-4 text-4xl font-extrabold leading-none  tracking-tight text-[#333333] md:text-5xl lg:text-6xl dark:text-white ">
          <span className="text-[#fc682e]">Bid</span>Buddies: Where Bids Meet Adventure!
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400  sm:max-w-2xl max-w-lg">
          Unleash the thrill of bidding on BidBuddies! Dive into exclusive
          auctions, discover unbeatable deals, and let the excitement begin.
        </p>

        <Link
          to="/auctions"
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-400 focus:ring-4 transition hover:shadow-lg focus:ring-orange-300 dark:focus:ring-blue-900 sm:w-48 xl:w-48 w-48"
        >
          Start Bidding
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>

    <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-36">
      <h4 className="text-2xl pl-1 text-[#696969] font-bold ">How it works</h4>

      <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-gray-200 pt-2 sm:mt-6 sm:pt-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <div className="p-4 py-6 flex flex-col justify-start rounded border shadow-lg">
          <h5 className="pb-4 text-lg font-bold text-[#464646]">
            Welcome Bonus
          </h5>

          <p className="font-medium max-w-sm text-[#696969]">
            New users kick off with 1000 credits upon joining BidBuddies, ready
            to dive into auctions.
          </p>
        </div>{" "}
        <div className="p-4 py-6 flex flex-col justify-start rounded border shadow-lg">
          <h5 className="pb-4 text-lg font-bold text-[#464646]">Credit Flow</h5>

          <p className="font-medium max-w-sm  text-[#696969]">
            Earn credits by selling items, then spend them on thrilling
            listings—simple, seamless, and rewarding.
          </p>
        </div>{" "}
        <div className="p-4 py-6 flex flex-col justify-start rounded border shadow-lg">
          <h5 className="pb-4 text-lg font-bold text-[#464646]">
            Unlock Bidding Power
          </h5>

          <p className="font-medium max-w-sm text-[#696969]">
            Register to gain exclusive bidding rights, turning browsing into
            active participation. Bid, win, and enjoy the auction excitement!
          </p>
        </div>
      </div>
    </div>

    {/* Latest Listings */}
    <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-36">
      <h1 className="font-bold tracking-widest text-2xl text-[#696969]">Latest</h1>
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-6 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {Array.isArray(latestListings) &&
          latestListings.map(
            ({ id, title, media, created, description, _count, seller }) => (
              <div
                key={id}
                className="flex flex-col border rounded-lg overflow-hidden shadow-lg"
              >
                <Link to={`/listings/${id}`}>
                  <img
                    className="w-full h-48 object-cover hover:scale-105 transition-all"
                    src={media}
                    alt={title}
                  />
                </Link>
                <div className="p-6">
                  <small>Created at {formatDate(created)}</small>
                  <h2 className="text-xl font-semibold mt-2">
                    {title && (
                      <span>
                        {title.charAt(0).toUpperCase() + title.slice(1)}
                      </span>
                    )}
                  </h2>
                  <p className="text-gray-600 mt-2">{description}</p>
                  <br />
                  <br />
                  <div className="flex flex-row w-full justify-between">
                    <small>
                      Seller:{" "}
                      {seller?.name &&
                        seller.name.charAt(0).toUpperCase() +
                          seller.name.slice(1)}
                    </small>{" "}
                    <small className="pl-28">Bids: {_count?.bids || 0}</small>{" "}
                    <br />
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </div>

    {/* Most Liked Listings */}
    <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-36">
      <h1 className="font-bold tracking-widest text-2xl text-[#696969]">Most bids</h1>
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 pb-16 sm:mt-6 sm:pt-16 sm:pb-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {Array.isArray(mostLikedListings) &&
          mostLikedListings.map(
            ({ id, title, media, created, description, _count, seller }) => (
              <div
                key={id}
                className="flex flex-col border rounded-lg overflow-hidden shadow-lg"
              >
                <Link to={`/listings/${id}`}>
                  <img
                    className="w-full h-48 object-cover"
                    src={media}
                    alt={title}
                  />
                </Link>
                <div className="p-6 flex flex-col h-full justify-between">
                  <small>Created at {formatDate(created)}</small>
                  <h2 className="text-xl font-semibold mt-2">
                    {title && (
                      <span>
                        {title.charAt(0).toUpperCase() + title.slice(1)}
                      </span>
                    )}
                  </h2>
                  <p className="text-gray-600 mt-2">{description}</p>
                  <br />
                  <br />
                  <div className="flex flex-row w-full justify-between">
                    <small>
                      Seller:{" "}
                      {seller?.name &&
                        seller.name.charAt(0).toUpperCase() +
                          seller.name.slice(1)}
                    </small>{" "}
                    <small className="pl-28">Bids: {_count?.bids || 0}</small>{" "}
                    <br />
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  </>
);

HomeUi.propTypes = {
  latestListings: PropTypes.array.isRequired,
  mostLikedListings: PropTypes.array.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default HomeUi;
