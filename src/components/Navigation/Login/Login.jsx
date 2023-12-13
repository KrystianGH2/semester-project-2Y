import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginUi from "./LoginUi.jsx";

function LoginLogic() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState(null);
  const [emailPlaceholder, setEmailPlaceholder] = useState("");
  const [passwordPlaceholder, setPasswordPlaceholder] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // This navigates to the home page after a successful login
  const navigateToHome = () => {
    setTimeout(() => {
      navigate("/home");
      window.location.reload();
    }, 2000);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    const payload = {
      email: email.value,
      password: password.value,
    };

    try {
      const res = await fetch(
        "https://api.noroff.dev/api/v1/auction/auth/login",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const data = await res.json();
      console.log(data);
      setData(data);
      setIsSuccess(res.ok);

      if (res.ok) {
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("email", data.email);
        localStorage.setItem("username", data.name);
        localStorage.setItem("credits", data.credits);
        localStorage.setItem("avatar", data?.avatar);

        const userName = localStorage.getItem("username", data.name);

        navigateToHome();

        const response = await fetch(
          `https://api.noroff.dev/api/v1/auction/profiles/${userName}?_listings=true`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        const results = await response.json();
        console.log(results);
        console.log(results.listings);
        localStorage.setItem("myListings", JSON.stringify(results.listings));
      } else {
        console.error("Login failed:", data);
        console.log(data.errors[0].message);
        setErrorMessage(data.errors[0].message); // Set error message
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Set initial placeholder values or fetch them from an API
    setEmailPlaceholder(
      `${Math.floor(Math.random() * 10000000)}-last@stud.noroff.no`
    );
    setPasswordPlaceholder(`${Math.floor(Math.random() * 10000000)}Pass.word`);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <LoginUi
      isSuccess={isSuccess}
      data={data}
      emailPlaceholder={emailPlaceholder}
      passwordPlaceholder={passwordPlaceholder}
      errorMessage={errorMessage}
      handleOnSubmit={handleOnSubmit}
      togglePasswordVisibility={togglePasswordVisibility}
      showPassword={showPassword}
    />
  );
}

export default LoginLogic;
