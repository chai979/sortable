const form = document.getElementById("registrationForm");
const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchName");
const genderFilter = document.getElementById("filterGender");

let registrations = [];
let sortAsc = true;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const gender = document.getElementById("gender").value;

  registrations.push({ name, email, gender });
  form.reset();
  displayTable();
});

function displayTable() {
  const filterText = searchInput.value.toLowerCase();
  const genderValue = genderFilter.value;

  const filtered = registrations.filter(item => {
    return (
      item.name.toLowerCase().includes(filterText) &&
      (genderValue === "" || item.gender === genderValue)
    );
  });

  tableBody.innerHTML = "";

  filtered.forEach(entry => {
    const row = `<tr>
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.gender}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

function sortTable(columnIndex) {
  const key = ["name", "email", "gender"][columnIndex];
  registrations.sort((a, b) => {
    const valA = a[key].toLowerCase();
    const valB = b[key].toLowerCase();
    return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });
  sortAsc = !sortAsc;
  displayTable();
}

searchInput.addEventListener("input", displayTable);
genderFilter.addEventListener("change", displayTable);
