const main = document.querySelector('.todo-list');
const delete1 = document.querySelector('.delete-complete-btn');
const addButton = document.querySelector('.addtodo-btn');
const todoValue = document.querySelector('.todo-value');
let checkedTodo = document.querySelectorAll('.check');
let paginationNum = document.querySelector('.pagination');
let removeTodo = document.querySelectorAll('.remove');
const rows = 10;
let current_page = 1;
let myArr = [];

const getTodos = () => {
  myArr = [];
  axios
    .get('http://localhost:3000/list')
    .then(response => myArr.push(response.data));
  setTimeout(() => {
    if (myArr[0].length) {
      template(myArr[0]);
    } else {
      main.innerHTML = '<h1>Nothing to do...</h1>';
    }
  }, 200);
};

const addTodos = todovalue => {
  axios
    .post('http://localhost:3000/list', {
      value: todovalue
    })
    .then(response => {
      myArr[0].push(response.data);
    });
};

// Add New Todo
addButton.addEventListener('click', () => {
  if (todoValue.value.length && todoValue.value.trim().length) {
    addTodos(todoValue.value);
    template(myArr[0]);
    todoValue.value = '';
  } else {
    todoValue.value = '';
  }
});

todoValue.addEventListener('keyup', event => {
  if (event.keyCode === 13 && todoValue.value.length) {
    if (todoValue.value.trim().length) {
      addTodos(todoValue.value);
      template(myArr[0]);
      todoValue.value = '';
    } else {
      todoValue.value = '';
    }
  }
});

// Remove Todo
const removeTodoFun = () => {
  removeTodo = document.querySelectorAll('.remove');
  removeTodo.forEach(element => {
    element.addEventListener('click', () => removeTodoFunLogic(event));
  });
};

const removeTodoFunLogic = event => {
  axios.delete(
    `http://localhost:3000/list/${event.target.parentNode.parentNode.id}`
  );

  setTimeout(() => {
    getTodos();
  }, 300);
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
  axios.patch(`http://localhost:3000/list/${id}`, {
    newValue
  });
  setTimeout(() => {
    getTodos();
  }, 50);
};

//template
const template = arr => {
  main.innerHTML = '';

  setTimeout(() => {
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
  }, 700);
};

getTodos();
