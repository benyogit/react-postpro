import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ExperienceList = props => {
  const items = props.experience.map(exp => (
    <Card  className="m-2" border="secondary" key={exp._id}>
      <Accordion.Toggle as={Card.Header} eventKey={exp._id}>
        {exp.company + " " + exp.from +" " +exp.to}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={exp._id}>
        <Card.Body>
          <Card.Title>{exp.title}</Card.Title>
          <Card.Text >{exp.role} </Card.Text>
          <Button variant="link" className="border-danger text-danger">Delete</Button>
        </Card.Body>
      </Accordion.Collapse>
      
    </Card>
  ));
  return (
    <div>
      <Accordion>{items}</Accordion>
    </div>
  );
};

export default ExperienceList;
