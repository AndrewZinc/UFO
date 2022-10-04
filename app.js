
// Import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data){
    // empty the table
    tbody.html("");
    // loop through the data - append a row and colunns
    data.forEach((dataRow) =>{
        let row = tbody.append("tr");
        // loop through the data - append the data values to the row.
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });
}

    
function handleClick() {
    // Get the datetime value from the filter
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;

    // Check if a date was entered and filter the data using that date
    if (date) {
        filteredData = filteredData.filter(row => row.datetime === date);  
    }

    // Rebuild the table using filteredData (default data or filtered)
    buildTable(filteredData);
}

// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);
