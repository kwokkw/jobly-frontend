import { useState } from "react";
import { Button } from "reactstrap";

function SearchForm({ search }) {
  const [formData, setFormData] = useState("");

  // Update search term whenever the user types
  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ener search term.."
          name="formData"
          value={formData}
          onChange={handleChange}
        />
        <Button color="primary">Submit</Button>
      </form>
    </>
  );
}

export default SearchForm;
