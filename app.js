//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption =document.querySelector(".filter-todo")





//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", delCheck);
filterOption.addEventListener("click", filterTodo);

//Function to addTodo 
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
    //Todo Div
    let todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerHTML=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.append(newTodo);

    // Add todo to Local Storage
    saveLocalTodos(todoInput.value);
    //Check mark button
    const checkedButton = document.createElement('button');
    checkedButton.innerHTML = '<i class="fas fa-check"></i>';
    checkedButton.classList.add('complete-btn');
    todoDiv.append(checkedButton);
    //Check Delete button
    const delButton = document.createElement('button');
    delButton.innerHTML = '<i class="fas fa-trash"></i>';
    delButton.classList.add('del-btn');
    todoDiv.append(delButton);
    //Append to list
    todoList.append(todoDiv);
    //Clear Todo Input Value
    todoInput.value="";
}

//Function to delete and mark Todo
function delCheck(e) {
    const item = e.target;
    //Delete Todo
    if(item.classList[0] === 'del-btn'){
        const todo = item.parentElement;
        // animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    }
    //check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


// function filterTodo(e) {
//     const todos = todoList.ChildNodes;
//     todos.forEach((todo) => {
//         if(todo.classList!== undefined){
//             switch (e.target.value) {
//                 case "all":
//                     alert(todo.style.display);  // Outputs: flex
//                     break;
                
//                 case "completed":
//                     if(todo.classlist.contains("completed")){
//                         alert(todo.style.display);  // Outputs: flex
//                     }else{
//                         alert(todo.style.display);  // Outputs: none
//                     }
//                     break;
//                     default:
//                         break;
                
                
//             }
//         }
//      return;
//     });
// }

// function to filter todo list
function filterTodo(e) {
    const todos = document.querySelectorAll('.todo');
    // it find childrens with selector alll
    todos.forEach((todo) => {
      switch(e.target.value) {
        case 'all':
          todo.style.display = 'flex';
          break;
        case 'completed':
          if(todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
          break;
        case 'uncompleted':
          if(!todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
          break;
      }
    })
  }


//   function to save todo to local storage

function saveLocalTodos(todo){
    // Check---
    let todos;
    if(localStorage.getItem('todos') === null){
       todos = []; 
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


// localStorage.clear(); to clear every stored information

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
       todos = []; 
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
            //Todo Div
            let todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');
            //Create LI
            const newTodo = document.createElement('li');
            newTodo.innerHTML=todo;
            newTodo.classList.add('todo-item');
            todoDiv.append(newTodo);

            //Check mark button
            const checkedButton = document.createElement('button');
            checkedButton.innerHTML = '<i class="fas fa-check"></i>';
            checkedButton.classList.add('complete-btn');
            todoDiv.append(checkedButton);
            //Check Delete button
            const delButton = document.createElement('button');
            delButton.innerHTML = '<i class="fas fa-trash"></i>';
            delButton.classList.add('del-btn');
            todoDiv.append(delButton);
            //Append to list
            todoList.append(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
       todos = []; 
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerHTML;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}