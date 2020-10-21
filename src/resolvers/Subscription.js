import {getUserId} from "../service";

const Subscription = {
  comment: {
    subscribe: (parents, { postId }, { prisma }, info) => {
      return prisma.subscription.comment({
        where: {
          node: {
            post: {
              id: postId
            }
          }
        }
      }, info);
    }
  },

  post: {
    subscribe: (parents, args, { prisma }, info) => {
      return prisma.subscription.post({where: {
        node: {
            published: true
        }
      }}, info);
    }
  },

  myPost: {
    subscribe: (parents, args, { prisma, request }, info) => {
      const id = getUserId(request);

      return prisma.subscription.post({where: {
        node: {
            author: {
              id
            }
        }
      }}, info);
    }
  }

};

export {Subscription};
