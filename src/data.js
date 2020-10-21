const posts = [
  {
    id: "1",
    title: "Post 1",
    body: "Somebody tex lay here ...",
    published: true,
    author: "1"
  },
  {
    id: "2",
    title: "Post 2",
    body: "Post 2 body published here...",
    published: true,
    author: "2"

  },
  {
    id: "3",
    title: "Post 3",
    body: "Post 3 is must to be published yet...",
    published: false,
    author: "2"

  },
  {
    id: "4",
    title: "Post 4",
    body: "Post 4 is must to be published yet...",
    published: false,
    author: "1"

  },
  {
    id: "5",
    title: "Post 5",
    body: "Post 5 is must to be published yet...",
    published: false,
    author: "1"

  },
];

const users = [
  {
    id: "1",
    name: "Dron",
    email: "udot@ukr.net",
    age: 42,
  },
  {
    id: "2",
    name: "Ivan",
    email: "ivan@ukr.net",
    age: 23,
  },
  {
    id: "3",
    name: "Dominic",
    email: "dominic@ukr.net",
    age: 17,
  },

];

const comments = [
  {
    id: "1",
    text: "I love this one",
    author: "1",
    post: "2",
  },
  {
    id: "2",
    text: "Also, I love this two",
    author: "1",
    post: "2",
  },
  {
    id: "3",
    text: "Hi, I am Ivan",
    author: "2",
    post: "1",
  },
  {
    id: "4",
    text: "I like post number 4",
    author: "1",
    post: "4",
  },
  {
    id: "5",
    text: "Neve give up",
    author: "2",
    post: "3",
  },
];

const db = {
  users,
  posts,
  comments
}

export {db as default}
