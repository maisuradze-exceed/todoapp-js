const deleteCompleted = document.querySelector('.delete-complete-btn');
const addButton = document.querySelector('.addtodo-btn');
const todoValue = document.querySelector('.todo-value');
const allBtn = document.querySelectorAll('.btn-div');
const pagBtn = document.querySelector('.pagination');
const main = document.querySelector('.todo-list');
let item = document.querySelectorAll('.todo-item');
let checkedTodo = document.querySelectorAll('.check');
let removeTodoBtn = document.querySelectorAll('.remove');
let current_page = 1;
let allCompleteBtn = document.querySelector('.allcomplete-btn');

// Add New Todo
addButton.addEventListener('click', () => {
  if (todoValue.value.length && todoValue.value.trim().length) {
    if (main.childElementCount === 10) {
      addTodos(todoValue.value);
      let btn = document.querySelector('.pagination').childElementCount;
      document.querySelector('.pagination').childNodes[btn - 1].click();
      todoValue.value = '';
    } else {
      addTodos(todoValue.value);
      todoValue.value = '';
    }
  } else {
    todoValue.value = '';
  }
});

// Remove Todo
const remove = () => {
  removeTodoBtn = document.querySelectorAll('.remove');
  removeTodoBtn.forEach((element) => {
    element.addEventListener('click', () => removefunc(event));
  });
};

//Complete Todo
const complete = () => {
  checkedTodo = document.querySelectorAll('.check');
  checkedTodo.forEach((element) => {
    element.addEventListener('change', () => completefunc(event));
  });
};

//Delete All Complete Todos
const delcomplete = () => {
  deleteCompleted.addEventListener('click', delcompfun);
  empty();
};

//Complete All
const allComplete = () => {
  allCompleteBtn.addEventListener('click', () => {
    item = document.querySelectorAll('.todo-item');
    let arr = [];
    item.forEach((element) => {
      arr.push(element);
    });
    let checker = () =>
      arr.every((element) => element.children[0].checked === true);
    if (!checker()) {
      arr.map((element) => {
        axios
          .patch(`http://localhost:3000/list/${element.id}`, {
            text: element.children[1].innerHTML,
            check: true,
          })
          .then(() => {
            location.reload();
          });
      });
    } else {
      arr.map((element) => {
        axios
          .patch(`http://localhost:3000/list/${element.id}`, {
            text: element.children[1].innerHTML,
            check: false,
          })
          .then(() => {
            location.reload();
          });
      });
    }
  });
};

//Check if All Complete
const check = () => {
  item = document.querySelectorAll('.todo-item');
  let arr = [];
  item.forEach((element) => {
    arr.push(element);
  });
  let checker = () =>
    arr.every((element) => element.children[0].checked === true);
  if (!checker()) {
    allCompleteBtn.innerHTML = 'Complete All';
  } else {
    allCompleteBtn.innerHTML = 'Uncomplete All';
  }
};

//Check If Empty
const empty = () => {
  if (!myArr[0].length) {
    main.innerHTML = '<h1>Nothing To Do</h1>';
    allBtn.forEach((element) => element.classList.add('hidden'));
  } else {
    allBtn.forEach((element) => element.classList.remove('hidden'));
  }
};

// Edit Todo
const edit = () => {
  let item = document.querySelectorAll('.todo-item');
  item.forEach((todo) => {
    todo.children[2].children[0].addEventListener('click', editfunc);
  });
};

//template
const template = () => {
  main.innerHTML = '';
  let arr = myArr[0];
  empty();
  displayList(arr, main, 10, current_page);
  pagButton(arr, pagBtn, 10);
};

function displayList(items, wrapper, rows, page) {
  wrapper.innerHTML = '';
  page--;
  let start = rows * page;
  let end = start + rows;
  let pagItem = items.slice(start, end);
  create(pagItem, wrapper);

  remove();
  edit();
  complete();
  delcomplete();
  check();
}

function pagButton(items, wrapper, rows) {
  wrapper.innerHTML = '';
  let page_count = Math.ceil(items.length / rows);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = paginationBtn(i, items);
    wrapper.appendChild(btn);
  }
}

function paginationBtn(page, items) {
  let button = document.createElement('button');
  button.innerText = page;

  if (current_page === page) {
    button.classList.add('active');
  }

  button.addEventListener('click', () => {
    current_page = page;
    displayList(items, main, 10, current_page);

    let current_btn = document.querySelector('.active');
    if (current_btn) {
      current_btn.classList.remove('active');
    }
    button.classList.add('active');
  });

  return button;
}

allComplete();
