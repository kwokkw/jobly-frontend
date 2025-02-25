import React, { useState, useContext, useEffect } from "react";
import JoblyApi from "../api";
import UserContext from "../UserContext";

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        username: currentUser.username || "",
        password: "",
      });
    }
  }, [currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await JoblyApi.saveProfile(username, profileData);
    } catch (errors) {
      console.error(errors);
      return;
    }

    setFormData((f) => ({ ...f, password: "" }));
    setCurrentUser(updatedUser);
    setSaveConfirmed(true);
  }

  /** Handle form data changing */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <>
      <h3>Profile</h3>
      {saveConfirmed ? <p type="success">Updated successfully. </p> : null}
      <form>
        <label>Username</label>
        <input
          type="text"
          name="username"
          className="form-control"
          placeholder={formData.username}
          disabled={true}
        />
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          className="form-control"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          className="form-control"
          value={formData.lastName}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Confirm password to make changes:</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          className="btn btn-primary btn-block mt-4"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </form>
    </>
  );
}

export default ProfileForm;
