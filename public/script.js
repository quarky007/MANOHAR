document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("employee-form");
  const employeeList = document.getElementById("employee-list");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const employee = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      hireDate: document.getElementById("hireDate").value,
      jobId: document.getElementById("jobId").value,
      salary: document.getElementById("salary").value,
    };

    const response = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });

    const newEmployee = await response.json();
    addEmployeeToList(newEmployee);
    form.reset();
  });

  async function fetchEmployees() {
    const response = await fetch("/api/employees");
    const employees = await response.json();
    employees.forEach(addEmployeeToList);
  }

  function addEmployeeToList(employee) {
    const li = document.createElement("li");
    li.textContent = `${employee.firstName} ${employee.lastName}`;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
      await fetch(`/api/employees/${employee._id}`, { method: "DELETE" });
      employeeList.removeChild(li);
    });
    li.appendChild(deleteButton);
    employeeList.appendChild(li);
  }

  fetchEmployees();
});
