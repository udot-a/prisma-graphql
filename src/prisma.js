import { Prisma } from "prisma-binding";
import { fragmentReplacements } from "./resolvers";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: "superpupersecrettool",
  fragmentReplacements
});

export {prisma };

// prisma.query.users(null, `{
//   id
//   name
//   posts {
//     id
//     title
//   }
// }`).then(data => console.log(JSON.stringify(data, null, 2 )));
//
// prisma.query.comments(null, `{
//     id
//     text
//     author {
//       id
//       name
//     }
//   }`).then(data => console.log(JSON.stringify(data, null, 2 )));

// prisma.mutation.updateUser(
//   {
//     data: { name: "Superman" },
//     where: {id: "ckfwnlkgd004908562li2w332"}
//   },
//   `{id}`
// )
//
// prisma.mutation.createPost(
//   {
//     data: {
//       title: "My first Post",
//       body:"",
//       published: false,
//       author: { connect: { id: "ckfwnlkgd004908562li2w332"} }
//     }
//   },
//   `{id}`
//   ).then(({id}) =>
//       prisma.mutation.updatePost(
//         {
//           data: { body: "Hello i typing my first post now", published: true},
//           where: {id}
//         }
//   )).then(data => console.log(JSON.stringify(data, null, 2 )));

// const createPostForUser = async(userId, data) => {
//   try {
//     await prisma.mutation.createPost(
//       {
//         data: {
//           ...data,
//           author: { connect: { id: userId} }
//         }
//       },
//       `{id}`
//     );
//
//     const users = await prisma.query.users(null, `{ id name email posts{title body published} }`);
//
//     console.log("USERS: ", JSON.stringify(users, undefined, 2));
//
//   } catch(e) {
//     console.warn("ERROR is: ", e)
//   }
// }
//
// const updatePost = async(postId, data) => {
//   try {
//     if (!await prisma.exists.Post({id: postId})) {
//       throw new Error("Post not found");
//     }
//     const {author: { id }} = await prisma.mutation.updatePost({where: {id: postId}, data}, `{author {id}}`);
//
//     const user = await prisma.query.user({where: {id} }, `{id name email posts { title body }}`);
//
//     console.log("USER: ", JSON.stringify(user, undefined, 2));
//   } catch (e) {
//     console.warn("ERROR is: ", e.message)
//   }
// }
//
// const userExists = async(id) => {
//   const exists = await prisma.exists.User({id});
//   console.log(`User with ID ${id} is ${exists ? "exists" : "does not exists"}`);
// }

// createPostForUser("ckfwnlkgd004908562li2w332", {
//   title: "Superman Post number One.",
//   body: "Post by Superman is typing here...",
//   published: false
// })

// userExists("ckfwnlkgd004908562li2w332");
//
//
// updatePost("rr670018085630a5p27p", {
//   title: "Updated post of Superman",
//   body: "Very new post is typing here by Superman...",
//   published: true
// });


