const fetchData = () => {
  return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
                return data.length;
      });
}

const postData = (post) => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));

}

const createPost = async (title,body) => {
  const id = await fetchData() + 1;
  const userId = Math.ceil(Math.random() * 6);
  const post = {
    userId: userId,
    id: id,
    title: title.value,
    body: body.value
  };
  postData(post);
}


document.getElementById('create-btn').addEventListener('focus', () => {
  const title = document.getElementById('title');
  const body = document.getElementById('body');
  createPost(title,body);
});
document.getElementById('home').addEventListener('focus',() => location.href = 'index.html');