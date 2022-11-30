import React from "react";
import StarBurst from "../starburst";
import { Container, Row, Col } from "react-bootstrap";
import Filter from "./Filter";

const MiteEradication = () => {
  return (
    <Container>
      <Row>
        <Col>
          <StarBurst />
        </Col>
        <Col>
          <Filter />
        </Col>
      </Row>
    </Container>
  );
};

export default MiteEradication;
