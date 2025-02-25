import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";

function Login({ login }) {
  const INITIAL_STATE = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
    navigate("/");
  };

  return (
    <>
      <p>Log In</p>
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
              />
            </label>
            <label htmlFor="username">
              Password
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="text"
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

export default Login;
