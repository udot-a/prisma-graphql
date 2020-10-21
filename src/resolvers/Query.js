import {getUserId} from "../service";

const Query = {

  comments(parents, args, {prisma}, info) {
    const {first, skip, after, orderBy} = args;
    return prisma.query.comments({ first, skip, after, orderBy }, info);

  },

  users: (parents, args, {prisma}, info) => {
    let opArgs = {};

    if (args.query) {
      opArgs = {
        orderBy: args.orderBy,
        first: args.first,
        skip: args.skip,
        after: args.after,
        where: {
          OR: [
            {name_contains: args.query.toLowerCase()}
          ]
        }
      }
    }

    return prisma.query.users(opArgs, info);
  },

  posts: (parents, args, {prisma}, info) => {
    let opArgs = {
      orderBy: args.orderBy,
      first: args.first,
      skip: args.skip,
      after: args.after,
      where: {
        published: true
      }
    };

    if (args.query) {
      opArgs.where.OR = [
            {title_contains: args.query.toLowerCase()},
            {body_contains: args.query.toLowerCase()}
      ]
    }

    return prisma.query.posts(opArgs, info);
  },

  myPosts: (parents, args, {prisma, request}, info) => {
    const id = getUserId(request);

    let opArgs = {
      orderBy: args.orderBy,
      first: args.first,
      skip: args.skip,
      after: args.after,
      where: {
        author: {
          id}
      }
    };

    if (args.query) {
      opArgs.where.OR = [
            {title_contains: args.query.toLowerCase()},
            {body_contains: args.query.toLowerCase()}
      ]
    }

    return prisma.query.posts(opArgs, info);
  },

  me: async(parents, args, {prisma, request}, info) => {
    const id = getUserId(request);

    return prisma.query.user({where: {id}});
  },

  post: async(parents, {id}, {prisma, request}, info) => {
    const userId = getUserId(request, false);
    const posts = await prisma.query.posts({
      where: {
        id,
        OR: [
          {published: true},
          {author: {id: userId}}
        ]
      }
    }, info);

    if (posts.length === 0) {
      throw new Error("Post not found!!!");
    }

    return posts[0];
  }
};

export {Query};
