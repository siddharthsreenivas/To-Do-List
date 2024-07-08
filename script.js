const inputBox = document.getElementById("input-box");
const toDoList = document.getElementById("todo-list");
const viewBox = document.getElementById("popupView");
const deleteBox = document.getElementById("popupDelete");
const editBox = document.getElementById("popupEdit");
const todoApp = document.getElementById('todoApp')
let todoListArray = [];
data = localStorage.getItem("todoTasks")
data2 = localStorage.getItem("todoCompleted")

if(data != null){
    todoListArray = JSON.parse(data)
    displayTodo()
}

if(data2 != null){
    document.getElementById('countCompletedTask').innerHTML = data2;
}

function addTask() {
    if (inputBox.value === '') {
        alert('Task List cannot be Empty!');
    } else {
        const toDo = inputBox.value;
        const toDoObj = {
            taskId: randomTaskid(),
            taskName: toDo ,
            completed : false
        };
        todoListArray.push(toDoObj);
        localStorage.setItem("todoTasks",JSON.stringify(todoListArray))
        displayTodo();
    }
    inputBox.value = '';
}

function randomTaskid(){
    // debugger
    let id;
    do {
      id = Math.floor(Math.random() * 100);
    } while (todoListArray.some(task => task.taskId === id));
    return id; 
}

function displayTodo(){

    toDoList.innerHTML = ''
    for(let index=0; index < todoListArray.length; index++){
        let li = document.createElement('li')
        let span = document.createElement('span')
        if(todoListArray[index].taskName.length < 18){
            span.innerHTML = todoListArray[index].taskName
            // li.innerHTML = todoListArray[index].taskName
            span.className = 'li-text'
            li.appendChild(span)
            // toDoList.appendChild(li)
        }
        else{
            let displayText = todoListArray[index].taskName.substring(0,15)
            span.innerHTML = displayText + '...'
            span.className = 'li-text'
            li.appendChild(span)
            // li.innerHTML = displayText + '...'
            // toDoList.appendChild(li)
        }
        if (todoListArray[index].completed) {
            li.classList.add('checked');
        }

        li.addEventListener('click', taskCompleted)
        li.taskId = todoListArray[index].taskId

        li.addEventListener('dblclick', removeTaskCompleted)
        li.taskId = todoListArray[index].taskId

        toDoList.appendChild(li);

        let delIcon = document.createElement('i')
        delIcon.className = 'fa-solid fa-trash-can del'
        li.appendChild(delIcon)
        delIcon.addEventListener('click', delTask)
        delIcon.taskId = todoListArray[index].taskId;

        let editIcon = document.createElement('i')
        editIcon.className = 'fa-solid fa-pen-to-square edit'
        li.appendChild(editIcon)
        editIcon.addEventListener('click', editTask)
        editIcon.taskId = todoListArray[index].taskId;

        let viewIcon = document.createElement('i')
        viewIcon.className = 'fa-regular fa-eye view'
        li.appendChild(viewIcon)
        viewIcon.addEventListener('click', viewTask)
        viewIcon.taskId = todoListArray[index].taskId;
    }
    
    document.getElementById('totalTask').innerHTML = todoListArray.length;
    if(todoListArray.length == 0){
        document.getElementById('extraInfo').style.display = "none"; 
    }
    else{
        document.getElementById('extraInfo').style.display = "flex";
    }
    
}

function countCompleted(){
    let count = 0;
    for(let i=0; i < todoListArray.length; i++){
        if(todoListArray[i].completed == true){
            count += 1
        }
    }
    if(todoListArray.length == 0){
        count = 0
    }
    return count
}

inputBox.addEventListener('keypress', function(e)  {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTask();
    }
});

// toDoList.addEventListener("click", function(e){
//     debugger
//     if(e.target.tagName === "LI"){
//         console.log("li")
//         e.target.className = "checked";

//     }
// })

// toDoList.addEventListener("dblclick", function(e){
//     if(e.target.tagName === "LI"){
//         e.target.className = "";
//     }
// })

function delTask(e) {
    const index = todoListArray.findIndex(m => m.taskId == e.target.taskId);
    deleteBox.classList.add('active');
    todoApp.classList.add('blur');
    document.querySelector('.overlay').style.display = 'block';
    const confirmDelete = document.getElementById("confirm-delete");
    const cancelDelete = document.getElementById("cancel-delete");

    function confirmDeleteListener() {
        todoListArray.splice(index, 1);
        displayTodo();
        deleteBox.classList.remove('active');
        todoApp.classList.remove('blur');
        document.querySelector('.overlay').style.display = 'none';
        localStorage.setItem("todoTasks",JSON.stringify(todoListArray))
        document.getElementById('countCompletedTask').innerHTML = countCompleted();
        localStorage.setItem("todoCompleted", countCompleted())
        if(todoListArray.length == 0){
            document.getElementById('extraInfo').style.display = "none";
        }
        else{
            document.getElementById('extraInfo').style.display = "flex";
        }

        confirmDelete.removeEventListener('click', confirmDeleteListener);
        cancelDelete.removeEventListener('click', cancelDeleteListener);
    };

    function cancelDeleteListener() {
        deleteBox.classList.remove('active');
        todoApp.classList.remove('blur');
        document.querySelector('.overlay').style.display = 'none';
        confirmDelete.removeEventListener('click', confirmDeleteListener);
        cancelDelete.removeEventListener('click', cancelDeleteListener);
    };

    confirmDelete.addEventListener('click', confirmDeleteListener);
    cancelDelete.addEventListener('click', cancelDeleteListener);
    
}

function editTask(e) {
    index = todoListArray.findIndex(m => m.taskId == e.target.taskId);
    // console.log(index)
    const value = todoListArray[index].taskName;
    editBox.classList.add('active');
    todoApp.classList.add('blur');
    document.querySelector('.overlay').style.display = 'block';
    const inputeditbox = document.getElementById('inputeditbox');
    const cancelEdit = document.getElementById("cancelEdit");
    const submitEdit = document.getElementById('submitedit');
    inputeditbox.value = value;
    inputeditbox.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          submitEditListener();
        }
    });
    function submitEditListener() {
        todoListArray[index].taskName = inputeditbox.value;
        displayTodo();
        editBox.classList.remove('active');
        todoApp.classList.remove('blur');
        document.querySelector('.overlay').style.display = 'none';
        localStorage.setItem("todoTasks",JSON.stringify(todoListArray))
        submitEdit.removeEventListener('click', submitEditListener);
        cancelEdit.removeEventListener('click', cancelEditListener);

    };
    function cancelEditListener() {
        editBox.classList.remove('active');
        todoApp.classList.remove('blur');
        document.querySelector('.overlay').style.display = 'none';
        submitEdit.removeEventListener('click', submitEditListener);
        cancelEdit.removeEventListener('click', cancelEditListener);
    };
    submitEdit.addEventListener('click', submitEditListener);
    cancelEdit.addEventListener('click', cancelEditListener);
    
}

function viewTask(e) {
    const index = todoListArray.findIndex(m => m.taskId == e.target.taskId);
    const value = todoListArray[index].taskName;
    const popupText = document.getElementById("popupText");
    const cancelView = document.getElementById("cancelView");
    popupText.innerHTML = value;
    viewBox.classList.add('active');
    todoApp.classList.add('blur');
    document.querySelector('.overlay').style.display = 'block';
    function cancelViewListener() {
        viewBox.classList.remove('active');
        todoApp.classList.remove('blur');
        document.querySelector('.overlay').style.display = 'none';
        cancelView.removeEventListener('click', cancelViewListener);
    };
    cancelView.addEventListener('click', cancelViewListener);
}

function taskCompleted(e){
    const index = todoListArray.findIndex(m => m.taskId == e.target.taskId);
    if(e.target.tagName === "LI" ){
        // console.log("li")
        e.target.className = "checked";
        todoListArray[index].completed = true
        console.log(todoListArray[index])
    }
    document.getElementById('countCompletedTask').innerHTML = countCompleted();
    localStorage.setItem("todoTasks",JSON.stringify(todoListArray))
    localStorage.setItem("todoCompleted", countCompleted())
}

function removeTaskCompleted(e){
    const index = todoListArray.findIndex(m => m.taskId == e.target.taskId);
    if(e.target.tagName === "LI"){
        // console.log("li")
        e.target.className = '';
        todoListArray[index].completed = false
        console.log(todoListArray[index])
    }
    document.getElementById('countCompletedTask').innerHTML = countCompleted();
    localStorage.setItem("todoTasks",JSON.stringify(todoListArray))
    localStorage.setItem("todoCompleted", countCompleted())
}

function removeAll(){
    if(window.confirm("Are you sure you want to clear all the tasks ??")){
        todoListArray.splice(0,todoListArray.length)
        displayTodo()
        localStorage.setItem("todoTasks",JSON.stringify(todoListArray))
        document.getElementById('countCompletedTask').innerHTML = countCompleted();
        localStorage.setItem("todoCompleted", countCompleted())
    }
} 
