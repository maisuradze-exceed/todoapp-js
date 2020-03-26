const addButton = document.querySelector('.addtodo-btn');
const todoValue = document.querySelector('.todo-value');
const todoList = document.querySelector('.todo-list')


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
    } 
})