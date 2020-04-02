const getTodos = () => {
  myArr = [];
  axios
    .get('http://localhost:3000/list/')
    .then(response => myArr.push(response.data))
    .then(template);
};

const addTodos = todovalue => {
  axios
    .post('http://localhost:3000/list', {
      value: todovalue
    })
    .then(response => {
      myArr[0].push(response.data);
    })
    .then(template);
};

const loadFirstTime = () => {
  main.innerHTML = 'Loading...';

  axios
    .get('http://localhost:3000/list')
    .then(response => myArr.push(response.data))
    .then(template);
};
