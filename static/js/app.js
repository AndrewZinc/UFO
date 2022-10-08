// from data.js
const tableData = data;

// get d3 field references to monitor for changes
var listVar = d3.selectAll(".list-group-item");

// get a d3 table reference
var tbody = d3.select("tbody");


function buildTable(data) {
  // Clear any existing data
  tbody.html("");

  // Loop through each object in the data and append a row and cells for each value
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// Create a variable to keep track of all the filters as an object.
var filterObject = {filterElement: "",
              dateFilter: "",
              cityFilter: "",
              stateFilter: "",
              countryFilter: "",
              shapeFilter: ""};

// Use this function to update the filters. 
function updateFilters() {
    
    // Save the element that was changed as a variable.
    filterObject.filterElement = d3.select(this);

    // Save the value that was changed as a variable.
    changeVar = d3.event.target.value;

    // Save the id of the filter that was changed as a variable.
    changeVarID = d3.event.target.id;

    // Add or clear the user-entered filter data to/from the filters object.
    if (changeVarID == "dateFilter") {
      filterObject.dateFilter = changeVar;
    } else if (changeVarID == "cityFilter") {
      filterObject.cityFilter = changeVar;
    } else if (changeVarID == "stateFilter") {
      filterObject.stateFilter = changeVar;
    } else if (changeVarID == "countryFilter") {
      filterObject.countryFilter = changeVar;
    } else if (changeVarID == "shapeFilter") {
      filterObject.shapeFilter = changeVar;
    }
  
    // Call function to apply all filters and rebuild the table
    filterTable();
  }

  // Use this function to filter the table when the user enters filter criteria.
  function filterTable() {

    // Set the filtered data to the tableData.
    let filteredData = tableData;
  
    // Loop through all of the filters in the filterObject and keep any data that matches the filter values
    for (let key in filterObject) {
      if (key == "dateFilter" && filterObject[key] !== "") {
        filteredData = filteredData.filter(row => row.datetime === filterObject[key]);  
      } 
      if (key == "cityFilter" && filterObject[key] !== "") {
        filteredData = filteredData.filter(row => row.city === filterObject[key]);  
      } 
      if (key == "stateFilter" && filterObject[key] !== "") {
        filteredData = filteredData.filter(row => row.state === filterObject[key]);  
      } 
      if (key == "countryFilter" && filterObject[key] !== "") {
        filteredData = filteredData.filter(row => row.country === filterObject[key]);  
      }
      if (key == "shapeFilter" && filterObject[key] !== "") {
        filteredData = filteredData.filter(row => row.shape === filterObject[key]);  
      }
    }

    if (filteredData.length == 0) {
      alert("There was no data that matched all of the filter values.");
    }
    // Completed processing for all the filters - call buildTable to present the data.
    buildTable(filteredData);
  }
  
  // Attach an event to listen for changes to each filter
  listVar.on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
