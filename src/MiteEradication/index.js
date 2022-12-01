import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import { Container, Row, Col } from "react-bootstrap";
import { MiteEradicationData } from "./exmaple_data";
import StarBurst from "../starburst";
import Filter from "./Filter";
import DataTable from "./DataTable";

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
    <FullHeightContainer>
      <FullHeightRow>
        <FullHeightColumn className="justify-end">
          <StarBurst data={formattedData} />
        </FullHeightColumn>
        <FullHeightColumn>
          <DetailContainer>
            <Filter miteGroups={miteGroups} handleCheck={handleCheck} />
            <DataTable miteData={miteData} />
          </DetailContainer>
        </FullHeightColumn>
      </FullHeightRow>
    </FullHeightContainer>
  );
};

export default MiteEradication;

const FullHeightRow = styled(Row)`
  height: 100%;
`;

const FullHeightContainer = styled(Container)`
  height: 100%;
`;
const FullHeightColumn = styled(Col)`
  height: 100%;
`;

const DetailContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  color: white;
  row-gap: 10px;
  padding: 25px 0;
`;
