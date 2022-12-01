import React from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const Filter = ({ miteGroups, handleCheck }) => {
  
  return (
    <FilterContainer>
      <Form>
        <h6>Groups</h6>
        {miteGroups &&
          miteGroups.map((mg) => (
            <Form.Check
              onChange={()=>handleCheck(mg.patient)}
              checked={mg.isChecked}
              type="switch"
              label={mg.group}
            />
          ))}
      </Form>
    </FilterContainer>
  );
};

export default Filter;

const CustomSwitch = styled(Form.Check)``;

const FilterContainer = styled.div`
  color: white;
`;
