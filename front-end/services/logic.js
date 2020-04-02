const completefunc = event => {
  let id = event.target.parentNode.id;
  let check = event.target.checked;
  let text = event.target.parentNode.children[1].innerText;
  event.target.parentNode.children[1].classList.remove('done');
  axios
    .patch(`http://localhost:3000/list/${id}`, {
      text,
      check
    })
    .then(getTodos);
};

const removefunc = event => {
  axios
    .delete(
      `http://localhost:3000/list/${event.target.parentNode.parentNode.id}`
    )
    .then(getTodos);
};

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

const delcompfun = () => {
  myArr[0].map(element => {
    if (element.isCompleted) {
      axios.delete(`http://localhost:3000/list/${element._id}`).then(getTodos);
    }
  });
};

const create = (pagItem, wrapper) => {
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
};

loadFirstTime();
