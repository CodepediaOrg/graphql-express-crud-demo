const {
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLString,
    GraphQLEnumType,
    GraphQLList,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLSchema
} = require("graphql");

const bookmarksApiService = require('./bookmarks-api.service');

const Bookmark = new GraphQLObjectType({
    name: "Bookmark",
    fields: {
        _id: {
            type: GraphQLID,
            description: "The id of the bookmark it's generated in MongoDb"
        },
        userId: {
            type:  GraphQLNonNull(GraphQLID),
            description: "The id of the user that created the bookmark"
        },
        public: {
            type: GraphQLBoolean,
            description: "Whether the bookmark is public or not"
        },
        location: {
            type:  GraphQLNonNull(GraphQLString),
            description: "Mostly the URL of the link"
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
            description: "Title of the bookmark"
        },
        description: {
            type: GraphQLString,
            description: "Notes about the bookmark - supports Markdown"
        },
        tags: {
            type:  GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))),
            description: "Tags are highly used on Bookmarks.dev"
        },
        likeCount: {
            type: GraphQLInt,
            description: "Number of public likes"
        },
        sourceCodeURL: {
            type: GraphQLString,
            description: "Where you can find the source code related to bookmark"
        }
    }
});

const BookmarkInput = new GraphQLInputObjectType({
    name: "BookmarkInput",
    fields: {
        _id: {
            type: GraphQLID
        },
        userId: {
            type: GraphQLID,
            description: "The id of the user that created the bookmark"
        },
        public: {
            type: GraphQLBoolean,
            description: "Whether the bookmark is public or not"
        },
        location: {
            type: GraphQLString,
            description: "Mostly the URL of the link"
        },
        name: {
            type: GraphQLString,
            description: "Title of the bookmark"
        },
        description: {
            type: GraphQLString,
            description: "Notes about the bookmark - supports Markdown"
        },
        tags: {
            type: new GraphQLList(GraphQLString),
            description: "Tags are highly used on Bookmarks.dev"
        },
        likeCount: {
            type: GraphQLInt,
            description: "Number of public likes"
        },
        sourceCodeURL: {
            type: GraphQLString,
            description: "Where you can find the source code related to bookmark"
        }
    }
});

const BookmarkOrderByType = new GraphQLEnumType({
    name: 'OrderBy',
    values: {
        MOST_LIKES: {value: "MOST_LIKES"},
        LAST_CREATED: {value: "LAST_CREATED"},
        MOST_USED: {value: "MOST_USED"}
    }
});

const UserProfile = new GraphQLObjectType({
    name: "UserProfile",
    fields: {
        displayName: {type: GraphQLString},
        imageUrl: {
            type: GraphQLString,
            description: "URL for the image avatar"
        }
    }
});

const User = new GraphQLObjectType({
    name: "User",
    fields: {
        userId: {
            type: GraphQLID,
            description: "user identifier - keycloak ID"
        },
        profile: {
            type: UserProfile
        },
        watchedTags: {
            type: new GraphQLList(GraphQLString),
            description: "Tags the user is following"
        },
        bookmarks: {
            type: new GraphQLList(Bookmark),
            description: "Bookmarks submitted by user",
            args: {
                bookmarkId: {
                    type: GraphQLID,
                    description: "You can filter only one bookmark by using its id. This has precedence over the other parameters"
                },
                last: {
                    type: GraphQLInt,
                    description: "Get only the last created"
                },
                orderBy: {
                    type: BookmarkOrderByType,
                    description: "Use to define the kind of bookmarks to fetch for the user"
                }
            },
            resolve: async (root, args, context) => {
                const userId = root.userId;
                const bearerToken = context.bearerToken;
                const bookmarkId = args.bookmarkId;
                if(bookmarkId) {
                    const response = await bookmarksApiService.getUserBookmarkById(userId, bearerToken, bookmarkId);
                    let arr = [];
                    arr.push(response);

                    return arr;
                } else {
                    const last = args.last || 5;
                    const orderBy = args.orderBy;
                    const response = await bookmarksApiService.getUserBookmarks(userId, bearerToken, last, orderBy);

                    return response.body;
                }
            }
        },
        feed: {
            type: new GraphQLList(Bookmark),
            description: "Bookmarks displayed in the user's feed",
            args: {
                last: {
                    type: GraphQLInt,
                    defaultValue: 5,
                    description: "Number of bookmarks to display in the User's feed"
                }
            },
            resolve: async (root, args, context) => {
                const userId = root.userId;
                const bearerToken = context.bearerToken;
                const last = args.last;
                const response = await bookmarksApiService.getBookmarksForFeed(userId, bearerToken, last);

                return response.body;
            }
        },
        history: {
            type: new GraphQLList(Bookmark),
            description: "Bookmarks the user created, updated or clicked recently",
            args: {
                last: {
                    type: GraphQLInt,
                    defaultValue: 5,
                    description: "Fetches only *last* bookmarks from history "
                }
            },
            resolve: async (root, args, context) => {
                const userId = root.userId;
                const bearerToken = context.bearerToken;
                const last = args.last || 5;
                const response = await bookmarksApiService.getBookmarksOfUserHistory(userId, bearerToken, last);

                return response.body;
            }
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        publicBookmarks: {
            type: new GraphQLList(Bookmark),
            resolve: async (root, args, context, info) => {
                const response = await bookmarksApiService.getPublicBookmarks();
                return response.body;
            }
        },
        userFeedBookmarks: {
            type: new GraphQLList(Bookmark),
            resolve: async (root, args, context, info) => {
                const {userId, bearerToken} = context;
                const response = await bokmarksApiService.getBookmarksForFeed(userId, bearerToken);
                return response.body;
            }
        },
        user: {
            type: User,
            args: {
                userId: {type: GraphQLID}
            },
            resolve: async (root, args, context) => {
                const bearerToken = context.bearerToken;
                const {userId} = args;
                const response = await bookmarksApiService.getUserData(userId, bearerToken);

                return response.body;
            }
        },
        bookmark: {
            type: Bookmark,
            args: {
                bookmarkId: {type: GraphQLID}
            },
            resolve: async (root, args, context) => {
                const bearerToken = context.bearerToken;
                const {bookmarkId} = args;
                const response = await bookmarksApiService.getBookmarkById(userId, bearerToken, bookmarkId);

                return response.body;
            }
        }
    },
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createBookmark: {
            type: Bookmark,
            args: {
                input: {type: BookmarkInput}
            },
            resolve: async (root, args, context) => {
                const { input } = args;

                const {userId, bearerToken} = context;
                const bookmark = await bookmarksApiService.createBookmark(bearerToken, userId, input);

                return bookmark;
            }
        },
        updateBookmark: {
            type: Bookmark,
            args: {
                bookmarkId: {type: GraphQLID},
                input: {type: BookmarkInput}
            },
            resolve: async (root, args, context) => {
                const { input, bookmarkId } = args;

                const {userId, bearerToken} = context;
                const bookmark = await bookmarksApiService.updateBookmark(bearerToken, userId, bookmarkId, input);

                return bookmark;
            }
        },

        deleteBookmark: {
            description: "Given its ID a bookmark can be deleted. Either by the one that created it or an Admin",
            type: Bookmark,
            args: {
                bookmarkId: {type: GraphQLID}
            },
            resolve: async (root, args, context) => {
                const bookmarkId = args.bookmarkId;
                const {userId, bearerToken} = context;
                const deletedBookmark = await bookmarksApiService.deleteBookmarkId(bearerToken, userId, bookmarkId);
                return deletedBookmark;

            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});
