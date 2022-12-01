import React from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const Filter = ({
  miteGroups,
  handleCheck,
  ageDemoGraphics,
  handleAgeChange,
  handleCompletedChange,
  selectedAge,
  completed,
}) => {
  return (
    <Form>
      <h6>Groups</h6>
      {miteGroups &&
        miteGroups.map((mg) => (
          <Form.Check
            onChange={() => handleCheck(mg.patient)}
            inline
            checked={mg.isChecked}
            type="switch"
            label={mg.group}
          />
        ))}
      <h6 className="mt-3">Age</h6>
      <Form.Check
        onChange={() => handleAgeChange(null)}
        inline
        name="ageDemoGraphics"
        checked={selectedAge === null}
        type="radio"
        label="All"
      />
      {ageDemoGraphics.map((age) => (
        <Form.Check
          onChange={() => handleAgeChange(age.id)}
          inline
          checked={selectedAge === age.id}
          name="ageDemoGraphics"
          type="radio"
          label={age.group}
        />
      ))}
      <h6 className="mt-3">Completed</h6>
      <Form.Check
        name="completed"
        type="radio"
        inline
        label="All"
        checked={completed === null}
        onChange={() => handleCompletedChange(null)}
      />
      <Form.Check
        name="completed"
        type="radio"
        inline
        label="Yes"
        checked={completed === 1}
        onChange={() => handleCompletedChange(1)}
      />
      <Form.Check
        name="completed"
        type="radio"
        inline
        label="No"
        checked={completed === 0}
        onChange={() => handleCompletedChange(0)}
      />
    </Form>
  );
};

export default Filter;
