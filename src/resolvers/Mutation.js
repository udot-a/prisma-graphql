import bcrypt from "bcryptjs";
import {getToken, getUserId, hashPassword} from "../service";

const checkExists = async (id, request, prisma, field, isDelete) => {
  const userId = getUserId(request);
  const isExists = await prisma.exists[field]({
    id,
    author: {
      id: userId
    }
  });

  if (!isExists) {
    throw new Error(`Unable to ${isDelete ? "delete" : "update"} ${field.toLowerCase()}!!!`)
  }

}

const Mutation = {

  login: async(parents, {data}, {prisma}, info) => {
    const {email} = data;

    const user = await prisma.query.user({where: {
        email
      }});


    if (data.password.length < 8) {
      throw new Error("Password must be 8  or longer ...")
    }

    if (!user) {
      throw new Error("User not found.");
    }
    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new Error("Incorrect password!!!")
    }


    return {
      user,
      token: getToken(user.id)
    }
  },

  createUser: async(parents, {data}, {prisma}, info) => {
    const {email} = data;

    const emailTaken = await prisma.exists.User({email});

    if (emailTaken) {
      throw new Error("Email taken.");
    }

    const password = await hashPassword(data.password);

    const user = await prisma.mutation.createUser({data: {...data, password }});

    return {
      user,
      token: getToken(user.id)
    }
  },

  deleteUser: async(parents, args, {prisma, request}, info) => {
    const id = getUserId(request);

    return prisma.mutation.deleteUser({where: { id }}, info);
  },

  updateUser: async(parents, {data}, {prisma, request}, info) => {
    const id = getUserId(request);

    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    const isUser = await prisma.exists.User({id});

    if (!isUser) {
      throw new Error("User not found.")
    }

    return prisma.mutation.updateUser({data, where: { id }}, info);
  },

  createPost: async(parents, {data}, {prisma, request}, info) => {
    const id = getUserId(request);

    return prisma.mutation.createPost({data: {...data, author: {connect: {id}}}}, info);
  },

  deletePost: async(parents, {id}, {prisma, request}, info) => {
    await checkExists(id, request, prisma, "Post", true);

    return prisma.mutation.deletePost({where: {id}}, info);
  },

  deleteAllPosts: async(parents, args, {prisma, request}, info) => {
    const id = await getUserId(request);

    return prisma.mutation.deleteManyPosts({where: {author: {id}}});
  },

  updatePost: async(parents, {id, data}, {prisma, request}, info) => {
    await checkExists(id, request, prisma, "Post", false);

    const isPublished = await prisma.exists.Post({id, published: true});

    if (isPublished && data.published === false) {
      await prisma.mutation.deleteManyComments({where: { post: { id } } });
    }

    return prisma.mutation.updatePost({data, where: {id}}, info);
  },

  createComment: async(parents, {data}, {prisma, request}, info) => {
    const postExists = await prisma.exists.Post( {
      id: data.post,
      published: true
    });

    if (!postExists) {
      throw new Error("Can not add comment to not published post!");
    }
    const id = getUserId(request);

    return prisma.mutation.createComment(
      {data: {
        ...data,
          author: {connect: { id } },
          post:  {connect: { id: data.post} }
        }
      },
      info
    );
  },

  deleteComment: async(parents, {id}, {prisma, request}, info) => {
    await checkExists(id, request, prisma, "Comment", true);

    return prisma.mutation.deleteComment({ where: {id}}, info);
  },

  updateComment: async(parents, {id, data}, {prisma, request}, info) => {
    await checkExists(id, request, prisma, "Comment", false);

    return prisma.mutation.updateComment({data, where: {id}}, info);
  }

};

export {Mutation};
