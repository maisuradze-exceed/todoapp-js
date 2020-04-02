const completefunc = event => {
  let id = event.target.parentNode.id;
  let newValue = event.target.checked;
  event.target.parentNode.children[1].classList.remove('done');
  axios
    .patch(`http://localhost:3000/list/${id}`, {
      newValue
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

loadFirstTime();
