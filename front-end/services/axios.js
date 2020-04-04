let list_element = document.querySelector('.todo-list');
const pagination = document.querySelector('.pagination');
let myArr = [];

const getTodos = () => {
  myArr = [];
  axios
    .get('http://localhost:3000/list')
    .then((response) => myArr.push(response.data))
    .then(template);
};

const addTodos = (todovalue) => {
  axios
    .post('http://localhost:3000/list', {
      value: todovalue,
    })
    .then(getTodos);
};

const loadFirstTime = () => {
  main.innerHTML = 'Loading...';

  axios
    .get('http://localhost:3000/list')
    .then((response) => myArr.push(response.data))
    .then(template);
};

const edfunc = () => {
  let text = event.target.parentNode.parentNode.children[1].innerHTML;
  let check = event.target.parentNode.parentNode.children[0].checked;
  text.trim();
  if (text.length) {
    axios
      .patch(
        `http://localhost:3000/list/${event.target.parentNode.parentNode.id}`,
        {
          text,
          check,
        }
      )
      .then(getTodos);
  }
};
