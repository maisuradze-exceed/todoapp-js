const main = document.querySelector('.todo-list');
const deleteCompleted = document.querySelector('.delete-complete-btn');
const addButton = document.querySelector('.addtodo-btn');
const todoValue = document.querySelector('.todo-value');
let checkedTodo = document.querySelectorAll('.check');
let paginationNum = document.querySelector('.pagination');
let removeTodoBtn = document.querySelectorAll('.remove');
const rows = 10;
let current_page = 1;
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

todoValue.addEventListener('keyup', event => {
  if (event.keyCode === 13 && todoValue.value.length) {
    if (todoValue.value.trim().length) {
      addTodos(todoValue.value);
      todoValue.value = '';
    } else {
      todoValue.value = '';
    }
  }
});

// Remove Todo
const removeTodoFun = () => {
  removeTodoBtn = document.querySelectorAll('.remove');
  removeTodoBtn.forEach(element => {
    element.addEventListener('click', () => removeTodoFunLogic(event));
  });
};

const removeTodoFunLogic = event => {
  axios
    .delete(
      `http://localhost:3000/list/${event.target.parentNode.parentNode.id}`
    )
    .then(getTodos);
};

//Complete Todo
const completeTodoFunc = () => {
  checkedTodo = document.querySelectorAll('.check');
  checkedTodo.forEach(element => {
    element.addEventListener('change', () => completeTodoBack(event));
  });
};

const completeTodoBack = event => {
  let id = event.target.parentNode.id;
  let newValue = event.target.checked;
  event.target.parentNode.children[1].classList.remove('done');
  axios
    .patch(`http://localhost:3000/list/${id}`, {
      newValue
    })
    .then(getTodos);
};

//Delete All Complete Todos
const deleteAllComplete = () => {
  deleteCompleted.addEventListener('click', deleteAllCompleteLogic);
};

const deleteAllCompleteLogic = () => {
  myArr[0]
    .map(element => {
      if (element.isCompleted) {
        axios.delete(`http://localhost:3000/list/${element._id}`);
      }
    })
    .then(getTodos);
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
  removeTodoFun();
  completeTodoFunc();
  deleteAllComplete();
};

loadFirstTime();
