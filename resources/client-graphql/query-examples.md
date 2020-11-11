Queries example to use in GraphiQL
---

## User

### User Data with history and feed bookmarks
```
{
	user(userId:"a7908cb5-3b37-4cc1-a751-42f674d870e1") {
    userId,
    profile {
      displayName
      imageUrl
    }
    feed  {
      ...bookmarkFields
    },
    history {
      ...bookmarkFields
    }
  }
}

fragment bookmarkFields on Bookmark {
  _id
  name
  location
  sourceCodeURL
  likeCount
}
```

### User with his bookmarks ordered by LAST_CREATED
```
{
	user(userId:"a7908cb5-3b37-4cc1-a751-42f674d870e1") {
    userId,
    profile {
      displayName
      imageUrl
    },
    bookmarks( orderBy:LAST_CREATED) {
      ...bookmarkFields
    },
    feed  {
      ...bookmarkFields
    },
    history {
      ...bookmarkFields
    }
  }
}

fragment bookmarkFields on Bookmark {
  _id
  name
  location
  tags
  sourceCodeURL
  likeCount
}
```