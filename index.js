// Query Selectors
const todoInput = document.querySelector('.todo-input');
const addButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


// Event Listners
document.addEventListener('DOMContentLoaded', getTodos);
addButton.addEventListener('click', addTodoFunction);
todoList.addEventListener('click', DeleteCheck);
filterOption.addEventListener('click', filterTodo);


// Functions
function addTodoFunction(event){
    event.preventDefault();


    // Create Div (class = todo)
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create Li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerHTML = todoInput.value;
    todoDiv.appendChild(newTodo);

    // Save to Local Storage
    saveLocalStorage(todoInput.value);

    const completebutton = document.createElement('button');
    completebutton.innerHTML = `<i class = "fas fa-check"></i>`;
    completebutton.classList.add('completed-btn');
    todoDiv.appendChild(completebutton);
    const deletebutton = document.createElement('button');
    deletebutton.innerHTML = `<i class = "fas fa-trash"></i>`;
    deletebutton.classList.add('deleted-btn');
    todoDiv.appendChild(deletebutton);

    // Get everything appended under TodoList
    todoList.appendChild(todoDiv);

    // Clear Input Value
    todoInput.value = "";
}

function DeleteCheck(params) {
    // console.log(params.target);
    const item = params.target;
    if (item.classList[1] === 'fa-trash') {
        const todo = item.parentElement.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }
    if (item.classList[1] === 'fa-check') {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
        // Found a soln to error : Cannot read property 'contains' of undefined.
        // Found a soln to error : Cannot set property 'display' of undefined.
        // Soln : the <ul></ul> tag in HTML should NOT have Empty Space inside it.
        // <ul>    { blank space inside tag}   </ul> will throw error.
    });
}

function saveLocalStorage(todo) {
    // Check first
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        // Create Div (class = todo)
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create Li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerHTML = todo;
    todoDiv.appendChild(newTodo);

    const completebutton = document.createElement('button');
    completebutton.innerHTML = `<i class = "fas fa-check"></i>`;
    completebutton.classList.add('completed-btn');
    todoDiv.appendChild(completebutton);
    const deletebutton = document.createElement('button');
    deletebutton.innerHTML = `<i class = "fas fa-trash"></i>`;
    deletebutton.classList.add('deleted-btn');
    todoDiv.appendChild(deletebutton);

    // Get everything appended under TodoList
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    // Check first
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}