import SearchForm from "./SearchForm";
import { useState, useEffect } from "react";
import JoblyApi from "../api";
import JobCard from "./JobCard";

function Jobs() {
  const [jobs, setJobs] = useState({
    data: null,
    isLoading: true,
  });

  useEffect(() => {
    async function loadJobs() {
      const jobs = await JoblyApi.getJobs();

      setJobs({
        data: jobs,
        isLoading: false,
      });
    }
    loadJobs();
  }, []);

  const search = async (searchTerm) => {
    const jobs = await JoblyApi.getJobs(searchTerm);
    setJobs((c) => ({ ...c, data: jobs }));
  };

  if (jobs.isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <SearchForm search={search} />

      {jobs.data.map((j) => (
        <JobCard
          key={j.id}
          id={j.id}
          title={j.title}
          companyName={j.companyName}
          salary={j.salary}
          equity={j.equity}
        />
      ))}
    </>
  );
}

export default Jobs;
