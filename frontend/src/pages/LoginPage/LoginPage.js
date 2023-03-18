import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError, reset]);

  return (
    <div className="container">
      <div className="images-container">
        <img
          className="left-image"
          src={require("../../images/Super-Enchi-GHI-Yellowbelly-Spotnose-Hypo-Clown-olive.jpg")}
          alt="left snake"
        />
        <img
          className="right-image"
          src={require("../../images/Orange-Dream-Yellowbelly-Cypress-Special-Clown-olive.jpg")}
          alt="right snake"
        />
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        {isServerError ? (
          <p className="error">Login failed, incorrect credentials!</p>
        ) : null}
        <Link to="/register">Click to register!</Link>
        <button>Login!</button>
      </form>
      <br></br>
      <br></br>
      <br></br>
      <div className="about-us-container">
        <h2>Say goodbye to messy notes and spreadsheets - Say hello Snake Keeper's Notebook!</h2>
        <br></br>
        <p>
        Snake Keeper's Notebook is an online platform designed for snake keepers and breeders to keep track of their snake collection, 
        feeding schedules, breeding records, and more. With this app, snake enthusiasts can efficiently manage and organize their snakes' information, 
        monitor their feeding habits, track their growth, and document breeding history all in one place.
        <br></br>
        <br></br>
        The app offers a user-friendly interface that makes it easy to use, and its various features are tailored to meet the specific needs of snake keepers and breeders. 
        Users can easily add new snakes, update their information, and log their feeding schedules using a simple and intuitive interface. 
        They can also keep track of breeding records and monitor the growth of their snakes with ease.
        <br></br>
        <br></br>
        Using the Snake Keeper's Notebook can help breeders and keepers stay organized and save time, as all snake-related information is in one location. 
        The app's ability to store detailed information about each snake and their feeding and breeding history helps ensure that all snakes are properly cared for 
        and that their owners can quickly identify any potential issues.
        <br></br>
        <br></br>
        Overall, the Snake Keeper's Notebook is an essential tool for any snake keeper or breeder who wants to keep their snake collection organized and well-documented.
        </p>
      </div>
    </div>
  );
};


export default LoginPage;
