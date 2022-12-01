import React from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const Filter = ({ miteGroups, handleCheck }) => {
  
  return (
      <Form>
        <h5>Groups</h5>
        {miteGroups &&
          miteGroups.map((mg) => (
            <Form.Check
              onChange={()=>handleCheck(mg.patient)}
              inline
              checked={mg.isChecked}
              type="switch"
              label={mg.group}
            />
          ))}
      </Form>
  );
};

export default Filter;

