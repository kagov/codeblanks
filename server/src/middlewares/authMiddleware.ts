import { config, RouterContext } from '../../deps.ts';

export const ensureAuthenticated = async (ctx: RouterContext, next: Function) => {
    console.log('in auth middleware');
    // currently the session is stored in local cookie var
    // TODo integrate redis
    const { request, response, cookies } = ctx;
    const cookie = cookies.get('Token');
    if(!cookie){
        console.log('no cookie');
        const reqUrl = request.url;
        const {issuer, clientId, redirectUrl, state} = config();
        const authUrl = `${issuer}/login/oauth/authorize?client_id=${clientId}&scope=read:user%20user:email&redirect_uri=${encodeURIComponent(redirectUrl)}&state=${state}:${reqUrl}`;
        response.redirect(authUrl);
    } else {
        next();
    }
    
}
