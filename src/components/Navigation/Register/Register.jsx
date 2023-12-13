import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState(null);
  const [emailPlaceholder, setEmailPlaceholder] = useState("");
  const [passwordPlaceholder, setPasswordPlaceholder] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState("");
  const url = "https://api.noroff.dev/api/v1/auction/auth/register";

  const navigate = useNavigate();
  const navigateToLogin = () => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const { email, password, name, avatar } = event.target.elements;

    const payload = {
      name: name.value,
      email: email.value,
      password: password.value,
      avatar: avatar.value,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${import.meta.env.REACT_APP_JWT_KEY}`,
      },
    };

    try {
      const res = await fetch(url, options);
      console.log("Response:", res);

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setData(data);
        console.log(">>>>>>>>>>>>>>>", data);
        setIsSuccess(true);
        setAvatar(data.avatar);
        navigateToLogin();
      } else {
        console.error("Registration failed:", res.statusText);
        const data = await res.json();
        console.error("Response data:", data);
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  useEffect(() => {
    setEmailPlaceholder(
      `${Math.floor(Math.random() * 10000000)}-last@stud.noroff.no`
    );
    setPasswordPlaceholder(`${Math.floor(Math.random() * 10000000)}Pass.word`);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {isSuccess ? (
            <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-[#585858]">
              Registered
            </h2>
          ) : (
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-wide text-[#585858]">
              Sign Up
            </h2>
          )}

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {isSuccess ? (
              <section className="w-full flex  justify-center">
                <p className="text-center text-green-900 font-semibold text-xl h-60 ">
                  👋 Welcome {data?.name}{" "}
                  <span className="text-orange-500">RandomUser</span> . You will
                  now redirect to the login page!
                </p>
              </section>
            ) : (
              <form
                onSubmit={handleOnSubmit}
                className="space-y-6"
                action="#"
                method="POST"
              >
                <div>
                  <label
                    htmlFor="avatar"
                    className="flex justify-center items-center text-sm font-medium leading-6 text-gray-900"
                  >
                    Avatar
                  </label>
                  <div className="flex justify-center items-center">
                    <div className="mt-2">
                      <img
                        src={avatar}
                        id="avatarInput"
                        name="avatarInput"
                        type="image"
                        autoComplete="avatarInput"
                        className="px-1 block w-24 h-24 rounded-full border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6 justify-center align-center"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>

                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder={`RandomUser_${Math.floor(
                        Math.random() * 10000000
                      )}`}
                      className="px-1 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder={emailPlaceholder}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="avatar"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image (Optional)
                  </label>
                  <div className="mt-2">
                    <input
                      id="avatar"
                      name="avatar"
                      type="text"
                      placeholder="https://images.url.com"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2 relative rounded-md shadow-sm">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      placeholder={passwordPlaceholder}
                      className="block w-full px-1 py-1.5 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="p-1.5 focus:outline-none focus:ring focus:border-indigo-600"
                      >
                        {showPassword ? (
                          <svg
                            className="h-5 w-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 14l9-5-9-5-9 5 9 5z"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 12a3 3 0 116 0 3 3 0 01-6 0z"
                            ></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 hover:shadow-lg transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default Register;
