window.onload = init;

function init() {
    setDefault();

    document.querySelector('#post').addEventListener('click', postTodo);
    document.querySelector('#delete').addEventListener('click', deleteCompleted);
}

function setDefault(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/todos');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = handleData;
    xhr.send();
}

// function getTodos(event) {
//     event.preventDefault();

//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', 'http://localhost:3000/todos');
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.onload = handleData;
//     xhr.send();
// }

function postTodo(event) {
    event.preventDefault();

    const userInput = document.querySelector(".user-input").value;

    const newTodo = {
        text: userInput,
        completed: false
    };
    
    const jsonnedTodo = JSON.stringify(newTodo);
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/todos');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = handleData;
    xhr.send(jsonnedTodo);
}

function markComplete(element) {
    event.preventDefault();
    const clickedID = element.id;
    const updatedTodo = {
        text: element.innerText,
        completed: true
    };
    const jsonnedTodo = JSON.stringify(updatedTodo);
    
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `http://localhost:3000/todos/${clickedID}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = handleData;
    xhr.send(jsonnedTodo);
}

function markIncomplete(element){
    event.preventDefault();
    const clickedID = element.id;
    const updatedTodo = {
        text: element.innerText,
        completed: false
    };
    const jsonnedTodo = JSON.stringify(updatedTodo);
    
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `http://localhost:3000/todos/${clickedID}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = handleData;
    xhr.send(jsonnedTodo);
}


function handleData(event) {
    event.preventDefault();
    const todos = JSON.parse(event.target.responseText);
    const todoList = document.querySelector('.todo-list');

    for (let i = 0; i < todos.length; i++) {
        let todoItem = document.createElement('li');
        todoItem.innerText = todos[i].text;
        todoItem.id = todos[i].id;
        if (todos[i].completed){
            todoItem.style.textDecoration = 'line-through';
        } else {
            todoItem.style.textDecoration = '';
        }
        todoItem.addEventListener('click', toggleDone);
        todoList.appendChild(todoItem);
    }
}



function toggleDone(event){
    const clickedElement = event.target;

    if(clickedElement.style.textDecoration === 'line-through'){
        clickedElement.style.textDecoration = '';
        markIncomplete(clickedElement);
    } else {
        clickedElement.style.textDecoration = 'line-through';
        markComplete(clickedElement);
    }
}

function deleteCompleted(event){
    event.preventDefault();

    const todoList = Array.from(document.querySelectorAll("li"));
    
    for (let i = 0; i < todoList.length; i++){
        if (todoList[i].style.textDecoration === 'line-through'){
            let deleteIndex = todoList[i].id;
            const xhr = new XMLHttpRequest();
            xhr.open('DELETE', `http://localhost:3000/todos/${deleteIndex}`);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = handleData;
            xhr.send();
        }
    }

    
}