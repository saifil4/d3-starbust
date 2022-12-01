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
        </tr>
      </thead>
      <tbody>
        {miteData.map((md) => (
          <tr>
            <td>{md.patient}</td>
            <td>{md.group}</td>
            <td>{md.mites_bl}</td>
            <td>{md.age}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </>
    
  );
};

export default DataTable;
