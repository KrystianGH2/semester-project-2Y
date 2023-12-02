import { Link } from "react-router-dom";
import { navigation } from "../../../route";
import PropTypes from "prop-types";
import bidBuddies from "../../assets/images/bidBuddies.png";
import coin from "../../assets/images/coin.png";

const HeaderUI = ({
  isMenuOpen,
  handleMenuToggle,
  isLoggedIn,
  getUserCredits,
  avatarUrl,
  handleProfileMenuToggle,
  isProfileMenuOpen,
  logOut,
  isLoading,
}) => {
  return (
    <div className="my-6">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-[100px] w-auto"
              src={bidBuddies}
              alt="Bid Buddies"
            />
          </div>
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleMenuToggle}
              className="sm:hidden rounded-full p-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">Open navigation menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>

            <div className="hidden sm:ml-6 sm:flex space-x-4">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                {isLoggedIn ? (
                  <>
                    <div
                      className="flex flex-row justify-center items-center gap-1"
                      key={getUserCredits}
                    >
                      <img className="w-5 h-5" src={coin} alt="" />{" "}
                      {getUserCredits}
                    </div>
                    <div className="ml-4 relative">
                      <button
                        type="button"
                        onClick={handleProfileMenuToggle}
                        className="bg-gray-800 rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <img
                          className="h-8 w-8 rounded-full"
                          src={avatarUrl}
                          alt=""
                        />
                      </button>

                      {isProfileMenuOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Link
                              to={"/Profile"}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                              Your Profile
                            </Link>

                            <Link
                              to={"/Create"}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                              Create a list
                            </Link>

                            <Link
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              to="/login"
                              onClick={logOut}
                            >
                              Sign out
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-orange-400 bg-[#F6F5F2] hover:bg-gray-700 hover:text-white transition-all rounded-md mx-6 px-3 py-2 text-md font-medium"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      className="text-white  bg-orange-500 hover:bg-gray-700 hover:text-white transition-all rounded-md px-3 py-2 text-md font-medium"
                    >
                      Get started
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden absolute top-0 inset-x-0 p-2 transition transform origin-top-right">
            <div className="rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src={bidBuddies}
                    alt="Your Company"
                  />
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    onClick={handleMenuToggle}
                    className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={handleMenuToggle}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-gray-700"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

HeaderUI.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  handleMenuToggle: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  getUserCredits: PropTypes.number.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  handleProfileMenuToggle: PropTypes.func.isRequired,
  isProfileMenuOpen: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default HeaderUI;
