import React from "react";
import StarBurst from "../starburst";
import { Container, Row, Col } from "react-bootstrap";
import Filter from "./Filter";
import { MiteEradicationData } from "./exmaple_data";
import _ from "lodash";

const MiteEradication = () => {
 
  const groups = _.uniqBy(MiteEradicationData, "group");

  const formattedData = groups.map((item) => {
    return {
      name: item.group,
      children: [
        {
          name: "0 to 3.99",
          value: MiteEradicationData.filter(
            ({ group, mites_bl }) =>
              group === item.group && mites_bl >= 0 && mites_bl < 4
          ).length,
        },
        {
          name: "4 to 6.99",
          value: MiteEradicationData.filter(
            ({ group, mites_bl }) =>
              group === item.group && mites_bl >= 4 && mites_bl < 7
          ).length,
        },
        {
          name: "7 to 10",
          value: MiteEradicationData.filter(
            ({ group, mites_bl }) =>
              group === item.group && mites_bl >= 7 && mites_bl <= 10
          ).length,
        },
      ],
    };
  });

  const finalData = {
    name: "Mite Eradication",
    children: formattedData,
  };

  return (
    <Container>
      <Row>
        <Col>
          <StarBurst data={finalData} />
        </Col>
        <Col>
          <Filter />
        </Col>
      </Row>
    </Container>
  );
};

export default MiteEradication;
