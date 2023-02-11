import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import ToolKitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

function DataTablePage() {
  const [memberList, setMemberList] = useState([]);

  // const { ExportCSVButton } = CSVExport;
  const MyExportCSV = (props) => {
    const handlClick = () => {
      props.onExport();
    };

    return (
      <div className="download-csv-container">
        <button className="download-csv-btn" onClick={handlClick}>
          Download
        </button>
      </div>
    );
  };

  const columns = [
    {
      dataField: "fullName",
      text: "Full Name",
      sort: true,
      filter: textFilter(),
    },
    { dataField: "program", text: "Program", filter: textFilter() },
    { dataField: "level", text: "Level", sort: true },
    {dataField: "membershipNumber", text: "Membership Number", filter:textFilter()},
    { dataField: "constituency", text: "Constituency", filter: textFilter() },
    { dataField: "phone", text: "Contact" },
    { dataField: "dateOfJoining", text: "Date Joined" },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  useEffect(() => {
    fetch("http://localhost:4000/registered")
      .then((res) => res.json())
      .then((result) => setMemberList(result))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="table-main">
      <ToolKitProvider
        bootstrap4
        keyField="_id"
        columns={columns}
        data={memberList}
        exportCSV
      >
        {(props) => (
          <React.Fragment>
            <MyExportCSV {...props.csvProps} />
            <BootstrapTable
              pagination={pagination}
              filter={filterFactory()}
              {...props.baseProps}
            />
          </React.Fragment>
        )}
      </ToolKitProvider>
    </div>
  );
}

export default DataTablePage;
