// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");

var filteredAddresses = dataSet;

// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredAddresses.length; i++) {
    // Get get the current address object and its fields
    var address = filteredAddresses[i];
    var fields = Object.keys(address);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = address[field];
    }
  }
}

// Render the table for the first time on page load
renderTable();

function filter(params) {
  event.preventDefault() // to get the browser not to reload the page

  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDate = params.date.trim();
  var filterCity = params.city.trim().toLowerCase();
  var filterState = params.state.trim().toLowerCase();
  var filterCountry = params.country.toLowerCase();
  var filterShape = params.shape.trim().toLowerCase();

  filteredAddresses = dataSet.filter(function(find) {
    var addressDate = find.datetime;
    var addressCity = find.city.toLowerCase();
    var addressState = find.state.toLowerCase();
    var addressCountry = find.country.toLowerCase();
    var addressShape = find.shape.toLowerCase();

    var isMatch = ((!filterDate || addressDate === filterDate)
      && (!filterCity || addressCity === filterCity)
      && (!filterState || addressState == filterState)
      && (!filterCountry || addressCountry == filterCountry)
      && (!filterShape || addressShape === filterShape))

    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    return isMatch;
  });
  renderTable();
}
