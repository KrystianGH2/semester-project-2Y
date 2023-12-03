import PropTypes from "prop-types";
import { Link } from "lucide-react";

const CreateUI = ({
  formData,
  handleInputChange,
  handleOnSubmit,
  formatDate,
  parsedListings,
  handleLoadMore,
  isButtonLoading,
  displayCount,
}) => {
  return (
    <>
      <div className="flex max-w-3xl mx-auto py-14 items-center justify-center ">
        <h1 className="font-bold text-2xl tracking-wider ">Create listing </h1>
      </div>
      <div className="border justify-center items-center rounded-md max-w-3xl mx-auto py-14 ">
        <form onSubmit={handleOnSubmit} className="max-w-xl mx-auto shadow-xs ">
          <div className="relative z-0 w-full mb-7 group">
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title || ""}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="title"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Title
            </label>
          </div>

          <div className="relative z-0 w-full mb-7 group">
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="description"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description
            </label>
          </div>

          <div className="relative z-0 w-full mb-7 group">
            <input
              type="text"
              name="image"
              id="image"
              value={formData.image || ""}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              placeholder=" "
            />
            <label
              htmlFor="image"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Image URL (Optional)
            </label>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-7 group">
              <input
                type="text"
                name="tags"
                id="tags"
                value={formData.tags || ""}
                onChange={handleInputChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                placeholder=" "
              />
              <label
                htmlFor="tags"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Tags
              </label>
            </div>
            <div className="relative z-0 w-full mb-7 group">
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date || ""}
                onChange={handleInputChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                placeholder=""
                required
              />
              <label
                htmlFor="date"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                End date
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="bg-white py-24 sm:py-32 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              My Listings
            </h1>
          </div>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {Array.isArray(parsedListings) &&
              parsedListings
                .slice(0, displayCount)
                .map(
                  ({ id, title, image, description, _count, seller, date }) => (
                    <div
                      key={id}
                      className="flex flex-col border rounded-lg overflow-hidden shadow-lg"
                    >
                      {console.log(">>>>>>>>>>>>>>>>>>><<<<<image", image)}
                      {image && (
                        <Link to={`/listings/${id}`}>
                          <img
                            className="w-full h-48 object-cover"
                            src={image}
                            alt={title}
                          />
                        </Link>
                      )}
                      <div className="p-6">
                        <small>Created at {formatDate(date)} </small>
                        <h2 className="text-xl font-semibold mt-2">{title}</h2>
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
                className="text-white bg-orange-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
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
                className="mt-8 bg-blue-500 text-white px-4 py-2 rounded items-center justify-center hover:bg-orange-500"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

CreateUI.propTypes = {
  formData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    tags: PropTypes.array,
    date: PropTypes.string,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
  parsedListings: PropTypes.array.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
  isButtonLoading: PropTypes.boolean,
  displayCount: PropTypes.number,
};

export default CreateUI;
