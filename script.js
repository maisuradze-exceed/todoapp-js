const addButton = document.querySelector('.addtodo-btn');
const todoValue = document.querySelector('.todo-value');
const todoList = document.querySelector('.todo-list');
const completedAll = document.querySelector('.allcomplete-btn');
let remove = document.querySelectorAll('img');
let checkComplete = document.querySelectorAll('.check')

// Add New Todo
addButton.addEventListener('click', () => {
    if (todoValue.value.length !== 0) {
        let value = todoValue.value;
        let div = document.createElement('div');
        div.className = 'todo-item';
        //creating p element
        let p = document.createElement('p')
        p.innerHTML = value;
        //creating checkbox
        let checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.className = 'check'
        // creating image
        let image = document.createElement('img')
        image.src = "./img/remove.png"
        //appending into div
        div.append(checkbox)
        div.append(p)
        div.append(image)
        //adding to main
        todoList.append(div)
        todoValue.value = ""
        updateTodo();
    } 
})



const updateTodo = () => {

    //Complete Todo
    removeTodo();
    completeTodo();
    check();
}

//Remove Todo
const removeTodo = () => {
    remove = document.querySelectorAll('img');
    remove.forEach(todo => {
        todo.addEventListener('click', (event) => {
            event.target.parentNode.remove()
        })
    });
}

// Complete Todo
const completeTodo = () => {
    checkComplete = document.querySelectorAll('.check')
    checkComplete.forEach(check => {
        check.addEventListener('change', (event) => {
            if (event.target.checked) {
                event.target.parentNode.children[1].className = 'done'
            } else {
                event.target.parentNode.children[1].className = ''
            }
        })
    });
}


//Complete All
const check = () => 
completedAll.addEventListener('click', () => {
    checkComplete.forEach(check => {
        check.parentNode.children[0].checked = true;
        check.parentNode.children[1].className = 'done';
    })
})







//Initializing calls
check();