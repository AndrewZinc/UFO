// from data.js
const tableData = data;

// get d3 field references to monitor for changes
var listVar = d3.selectAll(".list-group-item");

// get a d3 table reference
var tbody = d3.select("tbody");


function buildTable(data) {
  console.log("start buildTable");

  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data and append a row and cells for each value
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
  console.log("end buildTable");
}

// Create a variable to keep track of all the filters as an object.
var filterObject = {dateFilter: "",
              cityFilter: "",
              stateFilter: "",
              countryFilter: "",
              shapeFilter: ""};

// Use this function to update the filters. 
function updateFilters() {
    console.log("Begin updateFilters");
    
      // Save the value that was changed as a variable.
    changeVar = d3.event.target.value;
    console.log("got new value for filter");

    console.log(changeVar);

    // Save the id of the filter that was changed as a variable.
    changeVarID = d3.event.target.id;
    console.log(changeVarID);
    // If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
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

  // Use this function to filter the table when data is entered.
  function filterTable() {
    console.log("Begin filterTable");
    // Set the filtered data to the tableData.
    let filteredData = tableData;
  
    // Loop through all of the filters and keep any data that matches the filter values
    for (let key in filterObject) {
      // if (key == "dateFilter") {
      //   console.log(filterObject[key]);
      //   filteredData = filteredData.filter(row => row.datetime === filterObject[key]);  
      // }
      // } else if (key == "cityFilter") {
        if (key == "cityFilter") {
        console.log(filterObject[key]);
        filteredData = filteredData.filter(row => row.city === filterObject[key]);  
        }
      // } else if (key == "stateFilter") {
      //   console.log(filterObject[key]);
      //   filteredData = filteredData.filter(row => row.state === filterObject[key]);  
      // } else if (key == "countryFilter") {
      //   console.log(filterObject[key]);
      //   filteredData = filteredData.filter(row => row.country === filterObject[key]);  
      // } else if (key == "shapeFilter") {
      //   console.log(filterObject[key]);
      //   filteredData = filteredData.filter(row => row.shape === filterObject[key]);  
      // }
    }
    
    // if (filteredData.length) {
    //   buildTable(tableData);
    // } else  {
    // // Rebuild the table using the filtered data
    // buildTable(filteredData);
    // }

    buildTable(filteredData);
  }
  
  // Attach an event to listen for changes to each filter
  listVar.on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
