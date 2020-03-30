const addButton = document.querySelector('.addtodo-btn');
const todoValue = document.querySelector('.todo-value');
const todoList = document.querySelector('.todo-list');
const completedAll = document.querySelector('.allcomplete-btn');
const deleteComplete = document.querySelector('.delete-complete-btn');
let remove = document.querySelectorAll('.remove');
let edit = document.querySelectorAll('.edit');
let checkComplete = document.querySelectorAll('.check');
let save = document.querySelectorAll('.edit-text');
let text = document.querySelectorAll('.text');
let pagination = document.querySelectorAll('.todo-item');
let pag = document.querySelector('.todo-list');
let paginationNum = document.querySelector('.pagination');
let current_page = 1;
let rows = 10;
var myArr = [];
let unchecked = true;

// Add New Todo
addButton.addEventListener('click', () => {
  if (todoValue.value.length && todoValue.value.trim().length) template();
  else todoValue.value = '';
});

todoValue.addEventListener('keyup', event => {
  if (event.keyCode === 13 && todoValue.value.length) {
    if (todoValue.value.trim().length) template();
    else todoValue.value = '';
  }
});

//Delete Todo
const removeLogic = () => {
  index = [...myArr].indexOf(event.target.parentElement.parentElement);
  let arr = document.querySelector('.todo-list');
  if (myArr.length !== 1) {
    if (arr.children.length !== 1) {
      myArr.splice(index, 1);
      let myArr1 = myArr.filter(Boolean);
      updateTodoArray(myArr1);
    } else {
      myArr.pop();
      let myArr1 = myArr.filter(Boolean);
      todosControl(current_page, myArr1);
    }
  } else {
    myArr.pop();
    let myArr1 = myArr.filter(Boolean);
    updateTodoArray(myArr1);
    hideShow(myArr1);
  }
};

const removeTodo = () => {
  myArr.forEach(todo => {
    let element = todo.children[2].children[1];
    element.addEventListener('click', removeLogic);
  });
};

//Delete Completed
const goBackOnce = () => {
  myArr1 = myArr.filter(Boolean);
  pagination = document.querySelectorAll('.todo-item').length;
  if (!pagination && myArr1.length)
    document.querySelector('.pagination').children[0].click();
};

const deleteCompletedLogic = () => {
  let myArr1 = myArr;
  myArr1.map((arr, index) => {
    if (arr.children[0].checked) {
      delete myArr1[index];
    }
  });
  let arr = myArr1.filter(Boolean);
  updateTodoArray(arr);
  hideShow(arr);
  goBackOnce(arr);
};

const deleteCompleted = () => {
  deleteComplete.addEventListener('click', deleteCompletedLogic);
};

// Complete Todo

const todosControl = (page, data) => {
  let ans = page - 1;
  let current_btn = document.querySelector('.active');
  let button = current_btn.parentElement.children[ans - 1];
  current_btn.className = '';
  current_btn.remove();
  paginationBtn(page, data, button);
};

const paginationBtn = (page, data, button) => {
  let display = page - 1;
  displayList(data, todoList, rows, display);
  if (current_page === page && display) {
    button.classList.add('active');
  }
  if (display) document.querySelector('.active').click();
};

const completeTodo = () => {
  let myArr1 = myArr;
  myArr1.forEach(single => {
    single.children[0].addEventListener('change', event => {
      if (event.target.checked) {
        event.target.parentElement.children[1].className = 'text done';
        let myArr = myArr1.filter(Boolean);
        updateTodoArray(myArr);
        checkTodoHTML();
      } else {
        event.target.parentElement.children[1].className = 'text';
        let myArr = myArr1.filter(Boolean);
        updateTodoArray(myArr);
        checkTodoHTML();
      }
    });
  });
};

// Check if complete
const checkTodo = () => {
  completedAll.addEventListener('click', checkTodoLogic);
};

const checkTodoLogic = () => {
  let arr = [];
  save = document.querySelectorAll('.todo-item');
  save.forEach(saved => {
    arr.push(saved.children[0].checked);
  });
  let checker = arr => arr.every(v => v === true);
  if (!checker(arr)) {
    save.forEach(single => {
      if (single.children[0].checked === false) {
        single.children[0].checked = true;
        single.children[1].classList.add('done');
      }
    });
  } else {
    save.forEach(single => {
      if (single.children[0].checked === true) {
        single.children[0].checked = false;
        single.children[1].classList.remove('done');
      }
    });
  }
  checkTodoHTML();
};

const checkTodoHTML = () => {
  let arr = [];
  save = document.querySelectorAll('.todo-item');
  save.forEach(e => arr.push(e.children[0].checked));
  let checker = arr => arr.every(v => v === true);
  if (checker(arr)) completedAll.innerHTML = 'Uncomplete All';
  else completedAll.innerHTML = 'Complete All';
};

//Edit Todo
const editTodo = () => {
  let myArr1 = myArr;
  myArr1.forEach(todo => {
    todo.children[2].children[0].addEventListener('click', editLogic);
  });
};

const editLogic = () => {
  let data = event.target.parentNode.parentNode.children[1].innerHTML;
  let save = document.createElement('button');
  save.className = 'save-button';
  save.innerHTML = 'Save';
  let input = document.createElement('input');
  input.type = 'text';
  input.className = 'edit-text';
  input.maxLength = 45;
  input.value = data;
  let div = document.createElement('div');
  div.className = 'text-save';
  event.target.parentNode.className = 'hidden';
  event.target.parentNode.parentNode.children[0].className = 'hidden';
  event.target.parentNode.parentNode.children[0].checked = false;
  event.target.parentNode.parentNode.children[1].className = 'hidden';
  div.append(input);
  div.append(save);
  event.target.parentNode.parentNode.append(div);
  save.addEventListener('click', event => {
    let data = event.target.parentNode.parentNode.children[3].children[0].value;
    event.target.parentNode.parentNode.children[0].className = 'check';
    event.target.parentNode.parentNode.children[1].className = 'text';
    if (data.trim()) {
      event.target.parentNode.parentNode.children[1].innerHTML = data;
    }
    event.target.parentNode.parentNode.children[2].className = 'images';
    event.target.parentNode.parentNode.children[3].remove();
  });
  checkTodoHTML();
};

// Show completedAll/Delete Completed Button
const hideShow = arr => {
  if (arr.length === 0) {
    let btn = document.querySelectorAll('.btn-div');
    btn.forEach(button => button.classList.add('hidden'));
    pag.classList.add('hidden');
  }
};

const showHide = () => {
  if (myArr.length) {
    let btn = document.querySelectorAll('.btn-div');
    btn.forEach(button => button.classList.remove('hidden'));
    pag.classList.remove('hidden');
  }
};

// Update After Action
const updateTodoArray = (value, page) => {
  let val = value.filter(Boolean);
  let myvar = document.querySelector('.todo-list').children.length;
  if (myvar === 10) {
    displayList(val, todoList, rows, page);
    setupPagination(val, paginationNum, rows);
    checkTodoHTML();
  }
  displayList(val, todoList, rows, current_page);
  setupPagination(val, paginationNum, rows);
  checkTodoHTML();
};

// Pagination
pagination.forEach(pag => myArr.push(pag));

const displayList = (items, wrapper, rows_per_page, page) => {
  wrapper.innerHTML = '';
  page--;

  let start = rows_per_page * page;
  let end = start + rows_per_page;
  let pagianetItems = items.slice(start, end);
  for (let i = 0; i < pagianetItems.length; i++) {
    let item = pagianetItems[i];
    wrapper.append(item);
  }
};

const setupPagination = (items, wrapper, rows_per_page) => {
  wrapper.innerHTML = '';
  let page_count = Math.ceil(items.length / rows_per_page);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = paginationButton(i, items);
    wrapper.appendChild(btn);
  }
};

const paginationButton = (page, items) => {
  let button = document.createElement('button');
  button.innerText = page;
  if (current_page === page) {
    button.classList.add('active');
  }

  button.addEventListener('click', () => {
    current_page = page;
    displayList(items, todoList, rows, current_page);

    let current_btn = document.querySelector('.active');
    if (current_btn !== null) current_btn.classList.remove('active');
    button.classList.add('active');
    checkTodoHTML();
  });

  return button;
};

//template
const template = () => {
  let value = todoValue.value;
  let div = document.createElement('div');
  div.className = 'todo-item';
  //creating p element
  let p = document.createElement('p');
  p.innerHTML = value;
  p.className = 'text';
  //creating checkbox
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'check';
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
  myArr.push(div);
  let myvar = document.querySelector('.todo-list').children.length;
  if (myvar === 10) {
    updateTodoArray(myArr, current_page++);
  } else {
    updateTodoArray(myArr);
  }
  todoValue.value = '';
  removeTodo();
  editTodo();
  completeTodo();
  deleteCompleted();
  showHide();
  checkTodo();
  checkTodoHTML();
};

updateTodoArray(myArr);

//Initializing calls
removeTodo();
completeTodo();
editTodo();
deleteCompleted();
checkTodo();
checkTodoHTML();
