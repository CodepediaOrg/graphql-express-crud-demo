const superagent = require('superagent');

let getKeycloakAccessToken = async function(){
    try {
        const keycloakResponse = await superagent
            .post('http://localhost:8480/auth/realms/bookmarks/protocol/openid-connect/token')
            .send('client_id=bookmarks')
            .send('username=mock')
            .send('password=mock')
            .send('grant_type=password')
            .set('Accept', 'application/json');

        return keycloakResponse.body.access_token;

    } catch(error) {
        console.error('Error getting access token from keycloak', error);
        throw error;
    }
}

module.exports = {
    getKeycloakAccessToken: getKeycloakAccessToken
}