// References to form and table body
const studentForm = document.getElementById('student-form');
const recordsBody = document.getElementById('records-body');

// Load data from local storage
document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

// Add event listener to form
studentForm.addEventListener('submit', addStudent);

// Function to add a new student
function addStudent(event) {
    event.preventDefault();

    const name = document.getElementById('student-name').value.trim();
    const id = document.getElementById('student-id').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact-number').value.trim();

    if (!name || !id || !email || !contact) {
        alert("All fields are required.");
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert("Name can only contain letters and spaces.");
        return;
    }

    if (!/^\d+$/.test(id)) {
        alert("Student ID must be a number.");
        return;
    }

    if (!/^\d+$/.test(contact)) {
        alert("Contact number must be a number.");
        return;
    }

    const student = { name, id, email, contact };
    addToTable(student);
    saveToLocalStorage(student);

    studentForm.reset();
}

// Function to add a student to the table
function addToTable(student) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    row.querySelector('.edit-btn').addEventListener('click', () => editStudent(row, student));
    row.querySelector('.delete-btn').addEventListener('click', () => deleteStudent(row, student.id));

    recordsBody.appendChild(row);
}

// Function to edit a student
function editStudent(row, student) {
    document.getElementById('student-name').value = student.name;
    document.getElementById('student-id').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contact-number').value = student.contact;

    deleteStudent(row, student.id);
}

// Function to delete a student
function deleteStudent(row, id) {
    row.remove();
    removeFromLocalStorage(id);
}

// Local Storage functions
function saveToLocalStorage(student) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
}

function removeFromLocalStorage(id) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const updatedStudents = students.filter(student => student.id !== id);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
}

function loadFromLocalStorage() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.forEach(student => addToTable(student));
}
