const main = document.querySelector('.todo-list');
const deleteCompleted = document.querySelector('.delete-complete-btn');
const allCompleteBtn = document.querySelector('.allcomplete-btn');
const addButton = document.querySelector('.addtodo-btn');
const todoValue = document.querySelector('.todo-value');
const pagBtn = document.querySelector('.pagination');
let checkedTodo = document.querySelectorAll('.check');
let removeTodoBtn = document.querySelectorAll('.remove');
let current_page = 1;

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

//Complete All
// const allComplete = () => {};

// Edit Todo
const editTodo = () => {
  let item = document.querySelectorAll('.todo-item');
  item.forEach(todo => {
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
    let text = event.target.parentNode.parentNode.children[3].children[0].value;
    let check = event.target.parentNode.parentNode.children[0].checked;
    if (data.trim()) {
      axios
        .patch(
          `http://localhost:3000/list/${event.target.parentNode.parentNode.id}`,
          {
            text,
            check
          }
        )
        .then(getTodos);
    }
  });
};

//template
const template = () => {
  main.innerHTML = '';
  let arr = myArr[0];
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
  complete();
  delcomplete();
  editTodo();
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
