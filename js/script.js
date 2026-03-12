let tasks = [];

function loadTasks() {
    let tasksData = localStorage.getItem('tasks');
    if (tasksData) {
        tasks = JSON.parse(tasksData);
    } else {
        tasks = [];
    }
    console.log('Loaded ' + tasks.length + ' tasks');
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Saved tasks');
}

function addTask(title, desc, dueDate, priority) {
    loadTasks();
    let newTask = {
        id: Date.now(),
        title: title,
        desc: desc,
        dueDate: dueDate,
        priority: priority,
        status: 'pending'
    };
    tasks.push(newTask);
    saveTasks();
    alert('Task added successfully!');
    window.location.href = 'index.html';
}

function deleteTask(id) {
    if (confirm('Are you sure to delete this task?')) {
        loadTasks();
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == id) {
                tasks.splice(i, 1);
                break;
            }
        }
        saveTasks();
        alert('Task deleted!');
        window.location.reload();
    }
}

function updateTask(id, title, desc, dueDate, priority) {
    loadTasks();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks[i].title = title;
            tasks[i].desc = desc;
            tasks[i].dueDate = dueDate;
            tasks[i].priority = priority;
            break;
        }
    }
    saveTasks();
    alert('Task updated!');
    window.location.href = 'index.html';
}

function toggleStatus(id) {
    loadTasks();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            if (tasks[i].status == 'pending') {
                tasks[i].status = 'completed';
            } else {
                tasks[i].status = 'pending';
            }
            break;
        }
    }
    saveTasks();
    window.location.reload();
}

function getStats() {
    loadTasks();
    let total = tasks.length;
    let pending = 0;
    let completed = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status == 'pending') {
            pending++;
        } else {
            completed++;
        }
    }
    return { total: total, pending: pending, completed: completed };
}

function getAllTasks() {
    loadTasks();
    for (let i = 0; i < tasks.length; i++) {
        for (let j = i + 1; j < tasks.length; j++) {
            if (tasks[i].priority == 'low' && tasks[j].priority == 'high') {
                let temp = tasks[i];
                tasks[i] = tasks[j];
                tasks[j] = temp;
            }
        }
    }
    return tasks;
}

function searchTasks(searchTerm) {
    loadTasks();
    let results = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title.toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push(tasks[i]);
        }
    }
    return results;
}

loadTasks();