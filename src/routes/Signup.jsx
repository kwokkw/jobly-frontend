import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";

function Signup({ signup }) {
  const INITIAL_STATE = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const navigate = useNavigate();

  // Update form data field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await signup(formData);
    result.success ? navigate("/") : console.error("Submission Error.");
  };

  return (
    <>
      <p>Sign Up</p>
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <label>
              Username
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={formData.username}
              />
            </label>
            <label>
              Password
              <input
                type="text"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
            </label>
            <label>
              First name
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
              />
            </label>
            <label>
              Last name
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
              />
            </label>
            <label>
              Email
              <input
                type="text"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </label>
            <Button color="primary" block={true} size="sm">
              Submit
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
}

export default Signup;
