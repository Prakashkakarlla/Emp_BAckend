const form = document.getElementById('employeeForm');
const list = document.getElementById('employeeList');

const API_URL = 'http://localhost:5000/employees';

const loadEmployees = async () => {
  const res = await fetch(API_URL);
  const employees = await res.json();
  list.innerHTML = '';
  employees.forEach(emp => {
    const li = document.createElement('li');
    li.textContent = `${emp.name} - ${emp.position} (${emp.department})`;
    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.onclick = async () => {
      await fetch(`${API_URL}/${emp._id}`, { method: 'DELETE' });
      loadEmployees();
    };
    li.appendChild(del);
    list.appendChild(li);
  });
};

form.onsubmit = async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const position = document.getElementById('position').value;
  const department = document.getElementById('department').value;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, position, department })
  });

  form.reset();
  loadEmployees();
};

loadEmployees();

