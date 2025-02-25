import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCard from "./JobCard";

function CompanyDetails() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany(handle) {
      const company = await JoblyApi.getCompany(handle);
      setCompany(company);
    }
    getCompany(handle);
  }, [handle]);

  if (!company) return <p>Loading...</p>;
  return (
    <>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      {company.jobs.map((j) => (
        <JobCard
          key={j.id}
          id={j.id}
          title={j.title}
          salary={j.salary}
          equity={j.equity}
        />
      ))}
    </>
  );
}

export default CompanyDetails;

// <Route path="/companies/:handle" element={<CompanyDetail />} />
// This has no information about handle, how it is extracting/find out what handle we are looking for?
