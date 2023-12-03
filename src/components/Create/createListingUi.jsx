import PropTypes from "prop-types";

const CreateUI = ({ formData, handleInputChange, handleOnSubmit }) => {
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
};

export default CreateUI;
