const main = document.querySelector('.todo-list');
const deleteCompleted = document.querySelector('.delete-complete-btn');
const addButton = document.querySelector('.addtodo-btn');
const todoValue = document.querySelector('.todo-value');
let checkedTodo = document.querySelectorAll('.check');
let removeTodoBtn = document.querySelectorAll('.remove');
let myArr = [];

// Add New Todo
addButton.addEventListener('click', () => {
  if (todoValue.value.length && todoValue.value.trim().length) {
    addTodos(todoValue.value);
    todoValue.value = '';
  } else {
    todoValue.value = '';
  }
});

// Remove Todo
const remove = () => {
  removeTodoBtn = document.querySelectorAll('.remove');
  removeTodoBtn.forEach(element => {
    element.addEventListener('click', () => removefunc(event));
  });
};

//Complete Todo
const complete = () => {
  checkedTodo = document.querySelectorAll('.check');
  checkedTodo.forEach(element => {
    element.addEventListener('change', () => completefunc(event));
  });
};

//Delete All Complete Todos
const delcomplete = () => {
  deleteCompleted.addEventListener('click', delcompfun);
};

//template
const template = () => {
  main.innerHTML = '';
  let arr = myArr[0];

  arr.map(element => {
    let div = document.createElement('div');
    div.className = 'todo-item';
    div.id = element._id.toString();
    //creating p element
    let p = document.createElement('p');
    p.innerHTML = element.value;
    p.className = 'text';
    //creating checkbox
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'check';
    checkbox.checked = element.isCompleted;
    if (checkbox.checked) {
      p.classList.add('done');
    }
    // creating image
    let imagediv = document.createElement('div');
    let remove = document.createElement('img');
    let edit = document.createElement('img');
    imagediv.className = 'images';
    remove.src = './img/remove.png';
    remove.className = 'remove';
    edit.src = './img/edit-icon.png';
    edit.className = 'edit';
    imagediv.append(edit);
    imagediv.append(remove);
    //appending into div
    div.append(checkbox);
    div.append(p);
    div.append(imagediv);
    //adding to main
    main.append(div);
  });
  remove();
  complete();
  delcomplete();
};

loadFirstTime();
