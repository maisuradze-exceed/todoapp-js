const completefunc = (event) => {
  myArr = [];
  let id = event.target.parentNode.id;
  let check = event.target.checked;
  let text = event.target.parentNode.children[1].innerText;
  event.target.parentNode.children[1].classList.remove('done');
  axios
    .patch(`http://localhost:3000/list/${id}`, {
      text,
      check,
    })
    .then((res) => myArr.push(res.data))
    .then(template);
};

const removefunc = (event) => {
  myArr = [];
  let page = current_page - 2;
  let main = document.querySelector('.todo-list');
  if (main.children.length === 1) {
    axios
      .delete(
        `http://localhost:3000/list/${event.target.parentNode.parentNode.id}`
      )
      .then((res) => myArr.push(res.data))
      .then(template)
      .then(() => {
        if (!item.length && myArr[0].length > 9) {
          document.querySelector('.pagination').children[page].click();
        }
      });
  } else {
    axios
      .delete(
        `http://localhost:3000/list/${event.target.parentNode.parentNode.id}`
      )
      .then((res) => myArr.push(res.data))
      .then(template);
  }
};

todoValue.addEventListener('keyup', (event) => {
  if (event.keyCode === 13 && todoValue.value.length) {
    if (todoValue.value.trim().length) {
      addTodos(todoValue.value);
      todoValue.value = '';
    } else {
      todoValue.value = '';
    }
  }
});

const delcompfun = () => {
  let arr = [];
  myArr[0].map((element) => {
    if (element.isCompleted) {
      arr.push(element._id);
    }
  });
  myArr = [];
  let page = current_page - 2;
  axios
    .delete(`http://localhost:3000/list/multiple/${arr}`)
    .then((response) => myArr.push(response.data))
    .then(template)
    .then(() => {
      item = document.querySelectorAll('.todo-item');
      if (!item.length && myArr[0].length > 9) {
        document.querySelector('.pagination').children[page].click();
      }
    });
};

const editfunc = () => {
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
  event.target.parentNode.classList.add('hidden');
  event.target.parentNode.parentNode.children[0].classList.add('hidden');
  event.target.parentNode.parentNode.children[0].checked = false;
  event.target.parentNode.parentNode.children[1].classList.add('hidden');
  div.append(input);
  div.append(save);
  event.target.parentNode.parentNode.append(div);
  save.addEventListener('click', edfunc);
};

const create = (pagItem, wrapper) => {
  for (let i = 0; i < pagItem.length; i++) {
    let element = pagItem[i];
    let div = document.createElement('div');
    div.className = 'todo-item';
    div.id = element._id.toString();
    //creating p element
    let p = document.createElement('p');
    p.innerText = element.value.toString();
    p.className = 'text';
    // p.classList.add('done');
    //creating checkbox
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'check';
    checkbox.checked = element.isCompleted;
    checkbox.checked ? p.classList.add('done') : null;
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
};

loadFirstTime();
