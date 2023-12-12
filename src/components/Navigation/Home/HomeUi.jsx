import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HomeUi = ({ latestListings, mostLikedListings, formatDate }) => (
  <>
    {/* Latest Listings */}
    <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-36">
      <h1 className="font-bold tracking-widest text-2xl">Latest</h1>
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {Array.isArray(latestListings) &&
          latestListings.map(
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
      <h1 className="font-bold tracking-widest text-2xl">Most bids</h1>
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
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
