# Setup apollo graphQL in nextJs


```bash
yarn dev
```

> visit api/graphql

Get all users

```graphQL
{
  getUsers {
    id
    login
    avatar_url
  }
}
```

Query name from the users list

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


[link tutorial](https://www.smashingmagazine.com/2020/10/graphql-server-next-javascript-api-routes/)