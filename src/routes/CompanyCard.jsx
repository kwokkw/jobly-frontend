import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

function CompanyCard({ handle, name, description, logoUrl }) {
  return (
    <Link to={`/companies/${handle}`}>
      <Card>
        <CardBody>
          <h6>{name}</h6>
          <p>
            <small>{description}</small>
          </p>
        </CardBody>
      </Card>
    </Link>
  );
}

export default CompanyCard;
