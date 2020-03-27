const addButton = document.querySelector('.addtodo-btn');
const todoValue = document.querySelector('.todo-value');
const todoList = document.querySelector('.todo-list');
const completedAll = document.querySelector('.allcomplete-btn');
let remove = document.querySelectorAll('.remove');
let edit = document.querySelectorAll('.edit');
let checkComplete = document.querySelectorAll('.check');
let save = document.querySelectorAll('.edit-text');
let text = document.querySelectorAll('.text');
let unchecked = true;
let pagination = document.querySelectorAll('.todo-item');
let myArr = [];
let paginationNum = document.querySelector('.pagination');
let current_page = 1;
let rows = 10;

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
  console.log(wrapper);
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
    current_btn.classList.remove('active');

    button.classList.add('active');
  });

  return button;
};

displayList(myArr, todoList, rows, current_page);
setupPagination(myArr, paginationNum, rows);

// Add New Todo
addButton.addEventListener('click', () => {
  if (todoValue.value.length && todoValue.value.trim().length) {
    template();
  } else {
    todoValue.value = '';
  }
});

todoValue.addEventListener('keyup', event => {
  if (event.keyCode === 13 && todoValue.value.length) {
    if (todoValue.value.trim().length) {
      template();
    } else {
      todoValue.value = '';
    }
  }
});

const updateTodo = () => {};

//Remove Todo
const removeTodo = () => {
  let myArr1 = myArr;
  myArr1.forEach((todo, index) => {
    todo.children[2].children[1].addEventListener('click', () => {
      myArr1.splice(index, 1);
      updateTodoArray(myArr1);
    });
  });
};

const updateTodoArray = value => {
  displayList(value, todoList, rows, current_page);
  setupPagination(value, paginationNum, rows);
};

//Edit Todo
const editTodo = () => {
  edit = document.querySelectorAll('.edit');
  edit.forEach(todo => {
    todo.addEventListener('click', editLogic);
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
  event.target.parentNode.className = 'hidden';
  event.target.parentNode.parentNode.children[0].className = 'hidden';
  event.target.parentNode.parentNode.children[1].className = 'hidden';
  event.target.parentNode.parentNode.append(input);
  event.target.parentNode.parentNode.append(save);
  save.addEventListener('click', event => {
    let data = event.target.parentNode.children[3].value;
    event.target.parentNode.children[0].className = 'check';
    event.target.parentNode.children[1].className = 'text';
    if (data.trim()) {
      event.target.parentNode.children[1].innerHTML = data;
    }
    event.target.parentNode.children[2].className = 'images';
    event.target.parentNode.children[3].remove();
    event.target.parentNode.children[3].remove();
  });
};

// Complete Todo
const completeTodo = () => {
  checkComplete = document.querySelectorAll('.check');
  checkComplete.forEach(check => {
    check.addEventListener('change', event => {
      if (event.target.checked) {
        event.target.parentNode.children[1].className = 'done';
      } else {
        event.target.parentNode.children[1].className = 'text';
      }
    });
  });
};

//Check if complete
const checkTodo = () => {
  save = document.querySelectorAll('.edit-text');
  completedAll.addEventListener('click', () => {
    if (unchecked) {
      unchecked = false;
      selectAll();
    } else {
      unchecked = true;
      unSelectAll();
    }
  });
  const selectAll = () => {
    checkComplete.forEach(check => {
      save = document.querySelectorAll('.edit-text');
      if (!save.length) {
        check.checked = true;
        check.parentNode.children[1].className = 'done';
        completedAll.innerHTML = 'Uncomplete All';
      }
    });
  };
  const unSelectAll = () => {
    checkComplete.forEach(check => {
      if (!save.length) {
        check.checked = false;
        check.parentNode.children[1].className = '';
        completedAll.innerHTML = 'Complete All';
      }
    });
  };
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
  displayList(myArr, todoList, rows, current_page);
  setupPagination(myArr, paginationNum, rows);
  todoValue.value = '';
};

//Initializing calls
removeTodo();
checkTodo();
completeTodo();
editTodo();
