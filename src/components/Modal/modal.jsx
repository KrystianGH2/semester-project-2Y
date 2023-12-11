/* eslint-disable react/no-unescaped-entities */
import PropTypes from "prop-types";

const Modal = ({
  showModal,
  closeModal,
  onSubmit,
  avatarInput,
  setAvatarInput,
}) => {
  const handleNo = () => {
    closeModal();
  };

  return (
    showModal && (
      <div>
        {/* Dark overlay */}
        <div
          className="fixed inset-0 bg-black opacity-70 z-40"
          onClick={closeModal}
        ></div>
        {/* Modal */}
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed inset-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center"
        >
          <div className="relative p-4 w-full max-w-lg max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={closeModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  Are you sure you want to change your profile image?
                </h3>
                <form onSubmit={onSubmit} className="my-4">
                  <label
                    htmlFor="avatar"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Avatar URL:
                  </label>
                  <input
                    type="text"
                    id="avatar"
                    name="avatar"
                    value={avatarInput}
                    onChange={(e) => setAvatarInput(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  <div className="p-6">
                    <button
                      type="submit"
                      className="text-white bg-orange-500 hover:bg-orange-400 hover:shadow-lg focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center transition me-2"
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      type="button"
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 hover:shadow-lg  focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 transition hover:text-gray-900 focus:z-10"
                      onClick={handleNo}
                    >
                      No, cancel
                    </button>{" "}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  avatarInput: PropTypes.string.isRequired,
  setAvatarInput: PropTypes.func.isRequired,
};

export default Modal;
