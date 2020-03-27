const addButton = document.querySelector('.addtodo-btn');
const todoValue = document.querySelector('.todo-value');
const todoList = document.querySelector('.todo-list');
const completedAll = document.querySelector('.allcomplete-btn');
let remove = document.querySelectorAll('.remove');
let edit = document.querySelectorAll('.edit');
let checkComplete = document.querySelectorAll('.check');
let save = document.querySelectorAll('.edit-text');
let text = document.querySelectorAll('.text');

// Add New Todo
addButton.addEventListener('click', () => {
  if (todoValue.value.length) {
    if (todoValue.value.replace(/\s/g, '').length) {
      template();
      updateTodo();
    } else {
      todoValue.value = '';
    }
  }
});

todoValue.addEventListener('keyup', event => {
  if (event.keyCode === 13) {
    if (todoValue.value.length) {
      if (todoValue.value.replace(/\s/g, '').length) {
        template();
        updateTodo();
      } else {
        todoValue.value = '';
      }
    }
  }
});

const updateTodo = () => {
  removeTodo();
  completeTodo();
  editTodo();
};

//Remove Todo
const removeTodo = () => {
  remove = document.querySelectorAll('.remove');
  remove.forEach(todo => {
    todo.addEventListener('click', event => {
      event.target.parentNode.parentNode.remove();
    });
  });
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
    if (data) {
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
  let unchecked = true;
  completedAll.addEventListener('click', () => {
    if (unchecked) {
      unchecked = false;
      selectAll();
    } else {
      unchecked = true;
      UnSelectAll();
    }
  });
  const selectAll = () => {
    checkComplete.forEach(check => {
      save = document.querySelectorAll('.edit-text');
      if (save.length == 0) {
        check.checked = true;
        check.parentNode.children[1].className = 'done';
        completedAll.innerHTML = 'Uncomplete All';
      }
    });
  };
  const UnSelectAll = () => {
    checkComplete.forEach(check => {
      if (save.length == 0) {
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
  todoList.append(div);
  todoValue.value = '';
};

//Initializing calls
removeTodo();
checkTodo();
completeTodo();
editTodo();
