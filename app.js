document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const showAllBtn = document.getElementById('show-all');
    const showActiveBtn = document.getElementById('show-active');
    const showCompletedBtn = document.getElementById('show-completed');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks
    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        let filteredTasks = tasks.filter(task => {
            if (filter === 'active') return !task.completed;
            if (filter === 'completed') return task.completed;
            return true;
        });
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.text}</span>
                <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-btn">Delete</button>
            `;
            taskList.appendChild(li);

            li.querySelector('.complete-btn').addEventListener('click', () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks(filter);
            });

            li.querySelector('.delete-btn').addEventListener('click', () => {
                tasks = tasks.filter(t => t !== task);
                saveTasks();
                renderTasks(filter);
            });
        });
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add new task
    addTaskBtn.addEventListener('click', () => {
        if (taskInput.value.trim()) {
            tasks.push({ text: taskInput.value, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    // Filter buttons
    showAllBtn.addEventListener('click', () => renderTasks('all'));
    showActiveBtn.addEventListener('click', () => renderTasks('active'));
    showCompletedBtn.addEventListener('click', () => renderTasks('completed'));

    // Initialize tasks
    renderTasks();
});
