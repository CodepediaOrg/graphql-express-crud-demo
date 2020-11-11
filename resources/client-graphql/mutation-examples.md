## Bookmark
### Create User Bookmark
``` 
mutation createBookmark($input: BookmarkInput!)  {
  createBookmark(input: $input) {
    _id
    name
    location
  }
}
```
with Query Variables:
```
{
  "input":  {
    "userId": "a7908cb5-3b37-4cc1-a751-42f674d870e1",
    "public": true,
    "location": "https://www.codepedia.org/ama/complete-tutorial-crud-graphql-express",
    "name": "Build a CRUD functionality with GraphQL and ExpressJS",
    "description": "Build a CRUD API with GraphQL and ExpressJS on top of existing REST API supporting www.bookmarks.dev",
    "tags": ["graphql", "expressjs", "graphql-express", "rest", "api-design"],
    "sourceCodeURL": "https://github.com/CodepediaOrg/graphql-express-crud-demo"
  }

```

### Update Strasse 
``` 
mutation updateBookmark($input: BookmarkInput!)  {
  updateBookmark(bookmarkId:"5fa7a02997519f34ae94f7d5", input: $input) {
	_id
    name
    location
  }
}
```
with Query Variables:
```
{
  "input":  {
    "_id":"5fa7a02997519f34ae94f7d5",
    "userId": "a7908cb5-3b37-4cc1-a751-42f674d870e1",
    "public": true,
    "location": "https://www.codepedia.org/ama/complete-tutorial-crud-graphql-express",
    "name": "New Build a CRUD functionality with GraphQL and ExpressJS",
    "description": "Build a CRUD API with GraphQL and ExpressJS on top of existing REST API supporting www.bookmarks.dev",
    "tags": ["graphql", "expressjs", "graphql-express", "rest", "api-design"],
    "sourceCodeURL": "https://github.com/CodepediaOrg/graphql-express-crud-demo"
  }
}
```

### Delete Bookmark by Id

> You might want to first create a bookmark with the createBookmark mutation above
> then update it and in the end delete to test the functionality

#### Without wrapper
```
mutation {
  deleteBookmark(bookmarkId:"5fa7a02997519f34ae94f7d5") {
    name
    location
  }
}
```
