const superagent = require('superagent');

let getPublicBookmarks = function () {
    return superagent
        .get('http://localhost:3000/api/public/bookmarks?page=1&limit=5')
        .set('Accept', 'application/json');
}

let getBookmarksForFeed = function (userId, bearerToken, last) {
    return superagent
        .get(`http://localhost:3000/api/personal/users/${userId}/feed`)
        .query({page: 1})
        .query({limit: last})
        .set('Accept', 'application/json')
        .set('Authorization', bearerToken);
}

let getUserData = function (userId, bearerToken) {
    return superagent
        .get(`http://localhost:3000/api/personal/users/${userId}`)
        .set('Accept', 'application/json')
        .set('Authorization', bearerToken);
}

let getBookmarksOfUserHistory = function (userId, bearerToken, last) {
    return superagent
        .get(`http://localhost:3000/api/personal/users/${userId}/history`)
        .query({page: 1})
        .query({limit: last})
        .set('Accept', 'application/json')
        .set('Authorization', bearerToken);
}

let createBookmark = async function (bearerToken, userId, bookmark) {
    const response = await superagent
        .post(`http://localhost:3000/api/personal/users/${userId}/bookmarks`)
        .set('Accept', 'application/json')
        .set('Authorization', bearerToken)
        .send(bookmark);

    const locationHeaderValue = response.headers['location'];

    //set the id of the bookmarkexample now that it is created
    const lastSlashIndex = locationHeaderValue.lastIndexOf('/');
    const bookmarkId = locationHeaderValue.substring(lastSlashIndex + 1);
    const createdBookmark = await getUserBookmarkById(userId, bearerToken, bookmarkId);

    return createdBookmark;
}

let updateBookmark = async function (bearerToken, userId, bookmarkId, bookmark) {
    const response = await superagent
        .put(`http://localhost:3000/api/personal/users/${userId}/bookmarks/${bookmarkId}`)
        .set('Accept', 'application/json')
        .set('Authorization', bearerToken)
        .send(bookmark);

    return response.body;
}

let getUserBookmarks = function (userId, bearerToken, last, orderBy) {
    return superagent
        .get(`http://localhost:3000/api/personal/users/${userId}/bookmarks`)
        .query({page: 1})
        .query({limit: last})
        .query({orderBy: orderBy})
        .set('Accept', 'application/json')
        .set('Authorization', bearerToken);
}

let getUserBookmarkById = async function (userId, bearerToken, bookmarkId) {
    const response = await superagent
        .get(`http://localhost:3000/api/personal/users/${userId}/bookmarks/${bookmarkId}`)
        .set('Accept', 'application/json')
        .set('Authorization', bearerToken);

    return response.body;
}

let deleteBookmarkId = async function (bearerToken, userId, bookmarkId) {
    const bookmarkToBeDeleted = await getUserBookmarkById(userId, bearerToken, bookmarkId);

    await superagent
        .delete(`http://localhost:3000/api/personal/users/${userId}/bookmarks/${bookmarkId}`)
        .set('Accept', 'application/json')
        .set('Authorization', bearerToken);

    return bookmarkToBeDeleted;
}

module.exports = {
    //queries
    getPublicBookmarks: getPublicBookmarks,
    getBookmarksForFeed: getBookmarksForFeed,
    getUserData: getUserData,
    getBookmarksOfUserHistory: getBookmarksOfUserHistory,
    getUserBookmarks: getUserBookmarks,
    getUserBookmarkById: getUserBookmarkById,

    //mutations
    createBookmark: createBookmark,
    updateBookmark: updateBookmark,
    deleteBookmarkId: deleteBookmarkId
};