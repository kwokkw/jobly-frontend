import { Card, CardBody } from "reactstrap";
import ApplyBtn from "./ApplyBtn";

function JobCard({ id, title, companyName, salary, equity }) {
  const checkEquity = () => {
    return equity === null ? 0 : equity;
  };

  return (
    <Card>
      <CardBody>
        <h6>{title}</h6>
        <p>{companyName}</p>
        <br />
        <p>Salary: {salary}</p>
        <p>Equity: {checkEquity()}</p>
        <ApplyBtn key={id} id={id}></ApplyBtn>
      </CardBody>
    </Card>
  );
}

export default JobCard;
