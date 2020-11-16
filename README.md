# Setup apollo graphQL in nextJs


```bash
yarn dev
```

# GraphQL 數據類型
- Int
- Float
- String
- Boolean
- ID (unique)

必須要有的值 + **!**
eg:

```graphQL
id: ID!
content: String!
```

# GraphQL 關機字
api/schemas/index.js
`type Query {}` and `type Mutation {}`都是graphQL裡的關鍵字
一個代表查詢， 一個代表更變(crud)

> visit api/graphql

## Get all users

```graphQL
{
  getUsers {
    id
    login
    avatar_url
  }
}
```

# typeDefs and resolvers
resolvers是用于解析typeDefs查询的解析器
```graphQL
// Query对应查询，getUsers是一个函数，返回的是数据
const resolvers = {
  Query: {
    getUsers: async () => data
  }
}
```

# Query name from the users list

```graphQL
query($name: String!){
  getUser(name:$name){
        login
    id
    avatar_url
  }
}
```
**Open Query Variables**
```graphQL
{
  "name": "mojombo"
}
```

# Flow
> api/schemas/index.js
> api/resolves/index.js
當執行graphQL **query** or **mutation**， 它就會trigger resolves裡的function
如這項目的例子：
schemas裡有兩個 javascript query function，在resolves裡getUser 它需要args，那它args會是什麼呢？我們需要看回去 schemas裡的getUser設定


[link tutorial](https://www.smashingmagazine.com/2020/10/graphql-server-next-javascript-api-routes/)

# MongoMiddleware Flow
> example from api/user/[id].js
1. those cb function **async () => {}** will became /lib/api/mongo-middleware.js的handler
2. trigger **connectToMongo**
3. trigger **handler**
4. when 3 is trigger, it will trigger /api/user/[id].js first
5. after, call /lib/api/api-handler.js
6. `handlers[method](res)` handlers is an objects functions
7. `mongo-middleware.js` `async (req, res)` req and res 是從 handler pass 過來的,它叫做 curried function [stackoverflow](https://stackoverflow.com/questions/32782922/what-do-multiple-arrow-functions-mean-in-javascript?fbclid=IwAR0ZFecNchzZUnFT3DNQnytamYY9gi4o3Yp6XwhDsw0sw39IROqiVYhQSFg)

** some warning after trigger
> API resolved without sending a response for xxx this may result in stalled requests.