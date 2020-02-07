import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Moment from "react-moment";
import moment from "moment";

const ExperienceList = props => {
  console.log(props);
  const items = props.experience.map(exp => (
    <Card className="my-3" border="secondary" key={exp._id}>
      <Accordion.Toggle as={Card.Header} eventKey={exp._id}>
        <strong>{exp.company + "  "} </strong>
        <Moment format="MMM YYYY">{moment.utc(exp.from)}</Moment>
        {" - "}
        {exp.to ? <Moment format="MMM YYYY">{moment.utc(exp.to)}</Moment> : "Now"}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={exp._id}>
        <Card.Body>
          <Card.Title>{exp.company }</Card.Title>
          <Card.Subtitle>{exp.title}</Card.Subtitle>
          <Card.Text>{exp.role} </Card.Text>
        </Card.Body>
      </Accordion.Collapse>
      <Card.Footer>
        <Button onClick={() => props.delete(exp._id) } variant="outline-danger">Delete</Button>
      </Card.Footer>
    </Card>
  ));
  return (
    <div>
      <Accordion>{items}</Accordion>
    </div>
  );
};

export default ExperienceList;
