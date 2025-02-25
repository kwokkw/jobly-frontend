import { useContext, useState } from "react";
import { Button } from "reactstrap";
import UserContext from "../UserContext";
import JoblyApi from "../api";

function ApplyBtn({ id }) {
  const { currentUser } = useContext(UserContext);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  return (
    <Button
      color={hasAppliedToJob(id) ? "success" : "primary"}
      onClick={() => applyToJob(id)}
    >
      {hasAppliedToJob(id) ? "Applied" : "Apply"}
    </Button>
  );
}

export default ApplyBtn;
