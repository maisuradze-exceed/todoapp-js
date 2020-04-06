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
  myArr = [];
  axios
    .post('http://localhost:3000/list', {
      value: todovalue,
    })
    .then((res) => myArr.push(res.data))
    .then(template)
    .then(() => {
      let check = document.querySelectorAll('.todo-item');
      console.log(check);
      if (check.length === 10) {
        let btn = document.querySelector('.pagination').childElementCount;
        document.querySelector('.pagination').childNodes[btn - 1].click();
      }
    });
};

const loadFirstTime = () => {
  main.innerHTML = 'Loading...';

  axios
    .get('http://localhost:3000/list')
    .then((response) => myArr.push(response.data))
    .then(template);
};

const edfunc = () => {
  myArr = [];
  let text = event.target.parentNode.children[0].value;
  let check = event.target.parentNode.parentNode.children[0].checked;
  text.trim();
  if (text.trim().length) {
    axios
      .patch(
        `http://localhost:3000/list/${event.target.parentNode.parentNode.id}`,
        {
          text,
          check,
        }
      )
      .then((res) => myArr.push(res.data))
      .then(template);
  } else {
    event.target.parentNode.classList.remove('hidden');
    event.target.parentNode.parentNode.children[0].classList.remove('hidden');
    event.target.parentNode.parentNode.children[0].checked = false;
    event.target.parentNode.parentNode.children[1].classList.remove('hidden');
    event.target.parentNode.parentNode.children[2].className = 'images';
    event.target.parentNode.parentNode.children[3].remove();
  }
};
