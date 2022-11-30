import React, { useState, useMemo, useEffect } from "react";
import StarBurst from "../starburst";
import { Container, Row, Col } from "react-bootstrap";
import Filter from "./Filter";
import { MiteEradicationData } from "./exmaple_data";
import _ from "lodash";

const MiteEradication = () => {
  const [miteData, setMiteData] = useState(MiteEradicationData);

  const [miteGroups, setMiteGroups] = useState();
  const [filteredMiteGroups, setFilteredMiteGroups] = useState();

  useEffect(() => {
    setMiteGroups(
      _.uniqBy(miteData, "group").map((mg) => ({
        ...mg,
        isChecked: true,
      }))
    );
  }, [miteData]);

  useEffect(() => {
    if (miteGroups) {
      setFilteredMiteGroups(miteGroups.filter((mg) => mg.isChecked));
    } else {
      setFilteredMiteGroups([]);
    }
  }, [miteGroups]);

  const formattedData = useMemo(() => {
    if (!filteredMiteGroups) return { name: "Mite Eradication", children: [] };
    return {
      name: "Mite Eradication",
      children: filteredMiteGroups.map((item) => {
        return {
          name: item.group,
          children: [
            {
              name: "0 to 4 mites",
              value: miteData.filter(
                ({ group, mites_bl }) =>
                  group === item.group && mites_bl >= 0 && mites_bl < 4
              ).length,
            },
            {
              name: "4 to 7 mites",
              value: miteData.filter(
                ({ group, mites_bl }) =>
                  group === item.group && mites_bl >= 4 && mites_bl < 7
              ).length,
            },
            {
              name: "7 to 10 mites",
              value: miteData.filter(
                ({ group, mites_bl }) =>
                  group === item.group && mites_bl >= 7 && mites_bl <= 10
              ).length,
            },
          ],
        };
      }),
    };
  }, [miteData, filteredMiteGroups]);

  const handleCheck = (id) => {
    setMiteGroups(
      miteGroups.map((mg) =>
        mg.patient === id ? { ...mg, isChecked: !mg.isChecked } : mg
      )
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <StarBurst data={formattedData} />
        </Col>
        <Col>
          <Filter miteGroups={miteGroups} handleCheck={handleCheck} />
        </Col>
      </Row>
    </Container>
  );
};

export default MiteEradication;
