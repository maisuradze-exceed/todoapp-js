const main = document.querySelector('.todo-list');
const deleteCompleted = document.querySelector('.delete-complete-btn');
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

//template
const template = () => {
  main.innerHTML = '';
  let arr = myArr[0];
  displayList(arr, main, 10, current_page);
  pagButton(arr, pagBtn, 10);
  remove();
  complete();
  delcomplete();
};

loadFirstTime();

function displayList(items, wrapper, rows, page) {
  wrapper.innerHTML = '';
  page--;
  let start = rows * page;
  let end = start + rows;
  let pagItem = items.slice(start, end);
  console.log(pagItem);
  for (let i = 0; i < pagItem.length; i++) {
    let element = pagItem[i];
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
    wrapper.append(div);
  }
}

function pagButton(items, wrapper, rows) {
  wrapper.innerHTML = '';
  let page_count = Math.ceil(items.length / rows);
  console.log(page_count);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = paginationBtn(i, items);
    console.log(btn);
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
    current_btn.classList.remove('active');
    button.classList.add('active');
  });

  return button;
}
