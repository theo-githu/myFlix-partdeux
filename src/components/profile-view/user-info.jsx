import React, { useState } from 'react';
import { Button, Card, Collapse, Row, Col } from 'react-bootstrap';

// import { UpdateUser } from "../update-user/update-user";
// import { DeleteUser } from "../delete-user/delete-user";

export const UserInfo = ({ user }) => {
  const [open, setOpen] = useState(false);

  const dateBirthday = new Date(user.Birthday);
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  });

  const formattedBirthday = formatter.format(dateBirthday);

    return (
      <Card>
        <Card.Body>
          <Card.Title>
            <Row className='d-flex flex-column flex-lg-row ms-2 text-lg-center mt-lg-3 mt-3'>
              <Col>
                <span>Username: </span>
                <span className='fw-bolder'>{user.Username}</span>
              </Col>
              <Col>
                <span>Email: </span>
                <span className='fw-bolder'>{user.Email}</span>
              </Col>
              <Col>
                <span>Birthday: </span>
                <span className='fw-bolder'>{formattedBithday}</span>
              </Col>
              <Col>
                <Button
                  onClick={() => setOpen(!open)}
                  aria-controls="collapse-form"
                  aria-expanded={open}
                  variant="secondary"
                  className="text-white ms-4"
                  >
                  Edit User Info
                </Button>
              </Col>
            </Row>
          </Card.Title>
          <Collapse in={open}>
            <div id="collapse-form">
              <UpdateUser user={user} />
            </div>
          </Collapse>
        </Card.Body>
        <Card.Footer>
          <DeleteUser user={user} />
        </Card.Footer>
      </Card>
      );
    };