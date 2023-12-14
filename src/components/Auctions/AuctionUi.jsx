// AuctionUi.js
import PropTypes from "prop-types";
import SkeletonMain from "../skeleton/skeletonMain";
import ErrorHandler from "../errorHandler";
import { Link } from "react-router-dom";

function AuctionUi({
  isSuccess,
  loading,
  listings,
  displayCount,
  isButtonLoading,
  sortOption,
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleSortChange,
  handleLoadMore,
  formatDate,
  setShowInactive,
  showInactive,
}) {
  return (
    <>
      {isSuccess ? (
        <div>
          <ErrorHandler />
        </div>
      ) : (
        <>
          {loading ? (
            <SkeletonMain count={6} />
          ) : (
            <>
              <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-36">
                <form onSubmit={handleSearch}>
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-300 focus:border-gray-300"
                      placeholder="Search for items..."
                      required
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="text-white absolute end-2.5 bottom-2.5 bg-orange-500 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 shadow-lg transition-all"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
              <div className=" py-24 sm:py-28">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto max-w-7xl lg:mx-0 flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      Listings
                    </h1>
                    <div className=" mt-1 w-52 flex flex-row justify-between items-center">
                      <label
                        htmlFor="sortSelect"
                        className="text-base font-medium text-gray-900"
                      >
                        Sort by:
                      </label>
                      <select
                        id="sortSelect"
                        className="ml-2 p-[4px] border rounded"
                        value={sortOption}
                        onChange={(e) => {
                          handleSortChange(e);
                          if (e.target.value === "inactive") {
                            setShowInactive(!showInactive);
                          }
                        }}
                      >
                        <option className="" value="created">
                          Newest
                        </option>
                        <option value="oldest">Oldest</option>
                        <option value="highestBids">Highest Bids</option>
                        <option value="lowestBids">Lowest Bids</option>
                        <option value="titleAZ">A-Z</option>
                        <option value="titleZA">Z-A</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {Array.isArray(listings) &&
                      listings
                        .slice(0, displayCount)
                        .map(
                          ({
                            id,
                            title,
                            media,
                            created,
                            description,
                            _count,
                            seller,
                          }) => (
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
                              <div className="p-6 flex flex-col h-full justify-between">
                                <small>Created at {formatDate(created)}</small>
                                <h2 className="text-xl font-semibold mt-2">
                                  {title && (
                                    <span>
                                      {title.charAt(0).toUpperCase() +
                                        title.slice(1)}
                                    </span>
                                  )}
                                </h2>
                                <p className="text-gray-600 mt-2">
                                  {description}
                                </p>
                                <br />
                                <br />
                                <div className="flex flex-row w-full justify-between">
                                  <small>
                                    Seller:{" "}
                                    {seller?.name &&
                                      seller.name.charAt(0).toUpperCase() +
                                        seller.name.slice(1)}
                                  </small>{" "}
                                  <small className="pl-28">
                                    Bids: {_count?.bids || 0}
                                  </small>{" "}
                                  <br />
                                </div>
                              </div>
                            </div>
                          )
                        )}
                  </div>

                  {isButtonLoading ? (
                    <div className="flex items-center justify-center pt-8">
                      <button
                        disabled
                        type="button"
                        className="text-white bg-orange-500 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2  inline-flex items-center"
                      >
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline w-4 h-4 me-3 text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                        Loading...
                      </button>{" "}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <button
                        onClick={handleLoadMore}
                        className="mt-8 bg-orange-500 text-white px-4 py-2 rounded items-center justify-center hover:bg-orange-400 shadow-lg transition-all"
                      >
                        Load More
                      </button>
                    </div>
                  )}
                </div>
              </div>{" "}
            </>
          )}
        </>
      )}
    </>
  );
}

AuctionUi.propTypes = {
  isSuccess: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  listings: PropTypes.array.isRequired,
  displayCount: PropTypes.number.isRequired,
  isButtonLoading: PropTypes.bool.isRequired,
  sortOption: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSortChange: PropTypes.func.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
  setShowInactive: PropTypes.func.isRequired,
  showInactive: PropTypes.bool.isRequired,
};

export default AuctionUi;
