import { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import CompanyCard from "./CompanyCard";
import JoblyApi from "../api";

function Companies() {
  const [companies, setCompanies] = useState({
    data: null,
    isLoading: true,
  });

  useEffect(() => {
    async function loadCompanies() {
      const response = await JoblyApi.getCompanies();

      setCompanies({
        data: response,
        isLoading: false,
      });
    }
    loadCompanies();
  }, []);

  const search = async (searchTerm) => {
    const response = await JoblyApi.getCompanies(searchTerm);
    setCompanies((c) => ({ ...c, data: response }));
  };

  if (companies.isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <SearchForm search={search} />

      {companies.data.map((c) => (
        <CompanyCard
          key={c.handle}
          handle={c.handle}
          name={c.name}
          description={c.description}
          logoUrl={c.logoUrl}
        />
      ))}
    </>
  );
}

export default Companies;
