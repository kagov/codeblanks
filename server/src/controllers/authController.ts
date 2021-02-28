import { Router, RouterContext } from '../../deps.ts';
import { config } from '../../deps.ts';

const auth = new Router();

auth.get('/api/auth/callback', async (ctx: RouterContext) => {
  const {issuer, clientId, clientSecret, redirectUrl, state} = config();
  const { request, response, cookies} = ctx;  
  const { searchParams } = request.url;
  if(searchParams.get('state')?.split(':')[0] !== state){
    response.status = 400;
    response.body = {
        data: 'State code does not match.'
    }
  }
  
  const tokenUrl:string = `${issuer}/login/oauth/access_token`;
  const code:string | null = searchParams.get('code');
  
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
 
  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      client_id : clientId,
      client_secret : clientSecret,
      code : code,
      redirect_uri : redirectUrl,
      state : state
    })
  });
  const data = await res.json();
  if (!res.ok) {
      response.status = res.status
      response.body = data
  }

  else {
    const token = data.access_token;
    cookies.set('Token', token);
    response.redirect("http://localhost:4200/editor");
  }
});

export  { auth };
