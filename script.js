document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const prioritySelect = document.getElementById('priority-select');
    const todoList = document.getElementById('todo-list');
    const showAllBtn = document.getElementById('show-all-btn');
    const showPendingBtn = document.getElementById('show-pending-btn');
    const showCompletedBtn = document.getElementById('show-completed-btn');

    // Load tasks from local storage
    loadTodos();

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTodo(todoInput.value, prioritySelect.value);
        todoInput.value = '';
        prioritySelect.value = 'medium';
    });

    showAllBtn.addEventListener('click', () => {
        showTodos('all');
    });

    showPendingBtn.addEventListener('click', () => {
        showTodos('pending');
    });

    showCompletedBtn.addEventListener('click', () => {
        showTodos('completed');
    });

    function addTodo(task, priority) {
        const li = document.createElement('li');
        li.className = `list-group-item ${priority}`;

        const span = document.createElement('span');
        span.className = 'task-span';
        span.textContent = task;

        const editInput = document.createElement('input');
        editInput.className = 'form-control edit-input';
        editInput.type = 'text';
        editInput.value = task;

        const saveButton = document.createElement('button');
        saveButton.className = 'btn btn-success btn-sm save-button';
        saveButton.innerHTML = '<i class="fas fa-save"></i>';
        saveButton.addEventListener('click', () => {
            span.textContent = editInput.value;
            li.classList.remove('editing');
            saveTodos();
        });

        const cancelButton = document.createElement('button');
        cancelButton.className = 'btn btn-danger btn-sm cancel-button';
        cancelButton.innerHTML = '<i class="fas fa-times"></i>';
        cancelButton.addEventListener('click', () => {
            li.classList.remove('editing');
        });

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning btn-sm mr-2';
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener('click', () => {
            li.classList.add('editing');
        });

        const completeButton = document.createElement('button');
        completeButton.className = 'btn btn-success btn-sm mr-2';
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTodos();
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(li);
            saveTodos();
        });

        li.appendChild(span);
        li.appendChild(editInput);
        li.appendChild(saveButton);
        li.appendChild(cancelButton);
        li.appendChild(editButton);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        todoList.appendChild(li);
        saveTodos();
    }

    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach((li) => {
            const task = li.querySelector('.task-span').textContent;
            const priority = li.classList.contains('high') ? 'high' : li.classList.contains('medium') ? 'medium' : 'low';
            const completed = li.classList.contains('completed');
            todos.push({ task, priority, completed });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach((todo) => {
            addTodo(todo.task, todo.priority);
            if (todo.completed) {
                todoList.lastElementChild.classList.add('completed');
            }
        });
    }

    function showTodos(filter) {
        todoList.querySelectorAll('li').forEach((li) => {
            const isCompleted = li.classList.contains('completed');
            switch (filter) {
                case 'all':
                    li.style.display = 'flex';
                    break;
                case 'pending':
                    li.style.display = isCompleted ? 'none' : 'flex';
                    break;
                case 'completed':
                    li.style.display = isCompleted ? 'flex' : 'none';
                    break;
            }
        });
    }
});
