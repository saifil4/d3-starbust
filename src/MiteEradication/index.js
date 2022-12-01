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
  const [filteredMiteData, setFilteredMiteData] = useState(MiteEradicationData);
  const [miteGroups, setMiteGroups] = useState();
  const [selectedAge, setSelectedAge] = useState(null);
  const [completed, setCompleted] = useState(null);
  const [filteredMiteGroups, setFilteredMiteGroups] = useState();

  const ageDemoGraphics = [
    { id: 0, group: "Less than 18", min: 0, max: 18 },
    { id: 1, group: "18 to 34", min: 18, max: 34 },
    { id: 2, group: "35 to 44", min: 35, max: 44 },
    { id: 3, group: "45 to 54", min: 45, max: 54 },
    { id: 4, group: "55 and above", min: 0, max: 18 },
  ];

  useEffect(() => {
    let values = miteData;
    if (selectedAge) {
      const ageValue = ageDemoGraphics.find((age) => age.id === selectedAge);
      console.log(ageValue);
      values = values.filter(
        (md) => md.age >= ageValue.min && md.age < ageValue.max
      );
    }
    if (completed) {
      values = values.filter((md) => md.completed === completed);
    }
    setFilteredMiteData(values);
  }, [selectedAge, completed, miteData]);

  useEffect(() => {
    setMiteGroups(
      _.uniqBy(filteredMiteData, "group").map((mg) => ({
        ...mg,
        isChecked: true,
      }))
    );
  }, [filteredMiteData]);

  useEffect(() => {
    if (miteGroups) {
      setFilteredMiteGroups(miteGroups.filter((mg) => mg.isChecked));
    } else {
      setFilteredMiteGroups([]);
    }
  }, [miteGroups]);

  const formattedData = useMemo(() => {
    if (!filteredMiteGroups) return null;
    return {
      name: "Mite Eradication",
      children: filteredMiteGroups.map((item) => {
        return {
          name: item.group,
          children: [
            {
              name: "0 to 4 mites",
              value: filteredMiteData.filter(
                ({ group, mites_bl }) =>
                  group === item.group && mites_bl >= 0 && mites_bl < 4
              ).length,
            },
            {
              name: "4 to 7 mites",
              value: filteredMiteData.filter(
                ({ group, mites_bl }) =>
                  group === item.group && mites_bl >= 4 && mites_bl < 7
              ).length,
            },
            {
              name: "7 to 10 mites",
              value: filteredMiteData.filter(
                ({ group, mites_bl }) =>
                  group === item.group && mites_bl >= 7 && mites_bl <= 10
              ).length,
            },
          ],
        };
      }),
    };
  }, [filteredMiteData, filteredMiteGroups]);

  const handleCheck = (id) => {
    setMiteGroups(
      miteGroups.map((mg) =>
        mg.patient === id ? { ...mg, isChecked: !mg.isChecked } : mg
      )
    );
  };

  const handleAgeChange = (id) => {
    setSelectedAge(id);
  };
  const handleCompletedChange = (id) => {
    setCompleted(id);
  };

  return (
    <FullHeightContainer>
      <FullHeightRow>
        <FullHeightColumn className="justify-end">
          {formattedData && <StarBurst data={formattedData} />}
        </FullHeightColumn>
        <FullHeightColumn>
          <DetailContainer>
            <Filter
              miteGroups={miteGroups}
              handleCheck={handleCheck}
              handleAgeChange={handleAgeChange}
              handleCompletedChange={handleCompletedChange}
              ageDemoGraphics={ageDemoGraphics}
              selectedAge={selectedAge}
              completed={completed}
            />
            <DataTable miteData={filteredMiteData} />
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
