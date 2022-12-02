import React from "react";
import { Table } from "react-bootstrap";

const DataTable = ({ miteData }) => {
  return (
    <>
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Group</th>
            <th>Mite BL</th>
            <th>Age</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {miteData.map((md, index) => (
            <tr key={index}>
              <td>{md.patient}</td>
              <td>{md.group}</td>
              <td>{md.mites_bl}</td>
              <td>{md.age}</td>
              <td>{md.completed === 1 ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default DataTable;
