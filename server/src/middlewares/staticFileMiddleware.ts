import {Context, send} from '../../deps.ts'

export const staticFileMiddleware = async (ctx: Context, next: Function) => {
  const path = `${Deno.cwd()}/../dist/codeblanks${ctx.request.url.pathname}`;
  const { request, response, cookies } = ctx;
  const cookie = cookies.get('Token');
  // if cookie is not present then do something
  if (await fileExists(path)) {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/../dist/codeblanks`,
      index: 'index.html'
    })
  } else {
    await next();
  }
}

async function fileExists(path: string) {
  try {
    const stats = await Deno.lstat(path);
    return stats;
  } catch(e) {
    if (e && e instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw e;
    }
  }
}