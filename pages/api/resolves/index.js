import axios from "axios";

export const resolvers = {
  Query: {
    getMongoUsers: async () => {
      /**
      query {
        getMongoUsers {
          name
        }
      }
       */
      try {
        const mongoUsers = await axios.get("http://localhost:3000/api/users");
        return mongoUsers.data.map(({ _id, name }) => ({
          _id,
          name,
        }));
      } catch (error) {
        throw error;
      }
    },
    getUsers: async () => {
      try {
        /**
        {
          getUsers {
            id
            login
            avatar_url
            html_url
          }
        }
        */
        const users = await axios.get("https://api.github.com/users");

        return users.data.map(({ id, login, avatar_url, html_url }) => ({
          id,
          login,
          avatar_url,
          html_url,
        }));
      } catch (error) {
        throw error;
      }
    },
    getUser: async (parent, args, context) => {
      try {
        // const user = await axios.get("/api/users");
        // console.log(user);
        // return {
        //   id: user._id,
        //   name: user.name,
        // };

        const user = await axios.get(
          `https://api.github.com/users/${args.name}`
        );
        return {
          id: user.data.id,
          login: user.data.login,
          avatar_url: user.data.avatar_url,
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
