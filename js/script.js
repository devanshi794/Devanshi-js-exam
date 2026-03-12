const myForm = document.querySelector('#myForm');
const inputs = document.querySelectorAll('#myForm .form-input');
const myTable = document.querySelector('#myTable tbody');

let list = JSON.parse(localStorage.getItem('TaskList')) || [];
let EditTask = JSON.parse(localStorage.getItem('EditTask')) || {};
let data = {};

inputs?.forEach((input) => {

    input.addEventListener('input', (e) => {

        const { name, value } = e.target;

        data = {
            ...data,
            [name]: value
        };

    });

});

myForm?.addEventListener('submit', (e) => {

    e.preventDefault();

    if (data.id) {

        list = list.map((item) => {
            return item.id === data.id ? data : item;
        });

    } else {

        list.push({
            ...data,
            id: Date.now()
        });

    }

    localStorage.setItem('TaskList', JSON.stringify(list));
    localStorage.removeItem('EditTask');

    location.href = "../html/view-task.html";

});

const handleDisplay = (list) => {

    if (!myTable) return;

    myTable.innerHTML = "";

    list.forEach((item, index) => {

        const { id, title, description, duedate, priority } = item;

        let row = document.createElement('tr');

        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${title}</td>
        <td>${description}</td>
        <td>${duedate}</td>
        <td>${priority}</td>
        <td>
        <button class="btn btn-danger" onclick="handleDelete(${id})">Delete</button>
        <button class="btn btn-warning" onclick="handleEdit(${id})">Edit</button>
        </td>
        `;

        myTable.appendChild(row);

    });

};

if (myTable) {

    handleDisplay(list);

}

window.handleDelete = (id) => {

    list = list.filter((item) => item.id != id);

    localStorage.setItem('TaskList', JSON.stringify(list));

    handleDisplay(list);

};

window.handleEdit = (id) => {

    const task = list.find((item) => item.id == id);

    localStorage.setItem('EditTask', JSON.stringify(task));

    location.href = "../html/edit-task.html";

};

const displayTaskData = () => {

    inputs.forEach((input) => {

        const { name } = input;

        input.value = EditTask[name] || "";

    });

};

if (EditTask.id) {

    data = EditTask;

    displayTaskData();

}