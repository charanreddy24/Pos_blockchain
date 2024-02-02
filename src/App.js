// App.js

import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getYesterdayDate());

  useEffect(() => {
    fetchData();
  }, [selectedDate]);
  
  const fetchData = () => {
    if (!selectedDate) {
      console.error("Please select a date.");
      return;
    }

    fetch(`http://127.0.0.1:5000/metrics/${selectedDate}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetched:", data);
        setTableData(data);
      })
      .catch((error) =>
        console.error(
          "No data available for the selected date. Please select a valid date.",
          error
        )
      );
  };

  const handleDateChange = (e) => {
    const inputDate = new Date(e.target.value);
    // setStoreDate(inputDate);
    const day = inputDate.getDate().toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const year = inputDate.getFullYear().toString();

    const formattedDate = day + month + year;
    setSelectedDate(formattedDate);
  };

  function getYesterdayDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const day = yesterday.getDate().toString().padStart(2, "0");
    const month = (yesterday.getMonth() + 1).toString().padStart(2, "0");
    const year = yesterday.getFullYear().toString();

    return day + month + year;
  }

  return (
    <div className="app-container">
      <header className="header">
        Analyzing stake among validators in PoS blockchains
      </header>

      {selectedDate ? (
        <table className="metrics-table">
          {tableData && tableData.length > 0 ? (
            <>
              <thead>
                <tr>
                  <th>Blockchain</th>
                  <th>N</th>
                  <th>nc_safety</th>
                  <th>nc_safety_percent</th>
                  <th>nc_liveness</th>
                  <th>nc_liveness_percent</th>
                  <th>gini</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.blockchain}</td>
                    <td>{item.N}</td>
                    <td>{item.nc_safety}</td>
                    <td>{item.nc_safety_percent}%</td>
                    <td>{item.nc_liveness}</td>
                    <td>{item.nc_liveness_percent}%</td>
                    <td>{item.gini}</td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <div>
              <h3 className="no-data">
                No data available for the selected date. Please select a date
                between 24-10-2023 and 26-01-2024
              </h3>
            </div>
          )}
        </table>
      ) : (
        <div>
          <h3 className="no-data"> Please select a date</h3>
        </div>
      )}
      <div className="centered-content">
        <div className="date-selection">
          <label htmlFor="datePicker">Please select a date</label>
          <input
            className="date-picker"
            type="date"
            id="datePicker"
            //value=
            onChange={handleDateChange}
          />
        </div>
      </div>
      <div className="pdf-label centered-content">
        <label>Reference:</label>
        <a
          href="https://arxiv.org/abs/2312.13938"
          className="pdf-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Analyzing Blockchain Decentralization
        </a>
      </div>

      <footer className="footer">
        <a
          className="footerlink"
          href="https://github.com/sm86"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Follow me on Github
        </a>
      </footer>
    </div>
  );
};

export default App;
