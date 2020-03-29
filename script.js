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
let myArr = [];
let unchecked = true;

// Add New Todo
addButton.addEventListener('click', () => {
  if (todoValue.value.length && todoValue.value.trim().length) {
    template();
    removeTodo();
    editTodo();
    completeTodo();
    deleteCompletedLogic();
  } else {
    todoValue.value = '';
  }
});

todoValue.addEventListener('keyup', event => {
  if (event.keyCode === 13 && todoValue.value.length) {
    if (todoValue.value.trim().length) {
      template();
      removeTodo();
      editTodo();
      completeTodo();
      deleteCompletedLogic();
    } else {
      todoValue.value = '';
    }
  }
});

//Remove Todo
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
    let myArr1 = myArr.filter(Boolean);
    myArr.pop();
    updateTodoArray(myArr1);
  }
};

const removeTodo = () => {
  myArr.forEach(todo => {
    let element = todo.children[2].children[1];
    element.addEventListener('click', removeLogic);
  });
};

//Delete Complete

const deleteCompletedLogic = () => {
  myArr.map((arr, index) => {
    if (arr.children[0].checked) {
      delete myArr[index];
    }
  });
  let myArr1 = myArr.filter(Boolean);
  updateTodoArray(myArr1);
};

const deleteCompleted = () => {
  deleteComplete.addEventListener('click', deleteCompletedLogic);
};

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

// Complete Todo
const completeTodo = () => {
  let myArr1 = myArr;
  myArr1.forEach(single => {
    single.children[0].addEventListener('change', event => {
      if (event.target.checked) {
        event.target.parentElement.children[1].className = 'text done';
        let myArr = myArr1.filter(Boolean);
        updateTodoArray(myArr);
      } else {
        event.target.parentElement.children[1].className = 'text';
        let myArr = myArr1.filter(Boolean);
        updateTodoArray(myArr);
      }
    });
  });
};

// //Check if complete
// const checkTodo = () => {
//   save = document.querySelectorAll('.edit-text');
//   completedAll.addEventListener('click', () => {
//     if (unchecked) {
//       unchecked = false;
//       selectAll();
//     } else {
//       unchecked = true;
//       unSelectAll();
//     }
//   });
//   const selectAll = () => {
//     checkComplete.forEach(check => {
//       save = document.querySelectorAll('.edit-text');
//       if (!save.length) {
//         check.checked = true;
//         check.parentNode.children[1].className = 'done';
//         completedAll.innerHTML = 'Uncomplete All';
//       }
//     });
//   };
//   const unSelectAll = () => {
//     checkComplete.forEach(check => {
//       if (!save.length) {
//         check.checked = false;
//         check.parentNode.children[1].className = '';
//         completedAll.innerHTML = 'Complete All';
//       }
//     });
//   };
// };

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
    console.log(event.target.parentNode.parentNode.children[3]);
    event.target.parentNode.parentNode.children[2].className = 'images';
    event.target.parentNode.parentNode.children[3].remove();
  });
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
    myArr.filter(Boolean);
    current_page++;
    setupPagination(myArr, paginationNum, current_page);
  } else {
    myArr.filter(Boolean);
    updateTodoArray(myArr);
  }
  todoValue.value = '';
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
  });

  return button;
};

const updateTodoArray = value => {
  myArr.filter(Boolean);
  displayList(value, todoList, rows, current_page);
  setupPagination(value, paginationNum, rows);
};

displayList(myArr, todoList, rows, current_page);
setupPagination(myArr, paginationNum, rows);

//Initializing calls
removeTodo();
// checkTodo();
completeTodo();
editTodo();
deleteCompleted();
