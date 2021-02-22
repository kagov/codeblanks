import { bgGreen, black, Application, Router, RouterContext, Context, send } from "../deps.ts";
import { staticFileMiddleware } from "./middlewares/staticFileMiddleware.ts";

const router = new Router();


router
    .get('/hello', async (ctx: RouterContext) => {
        console.log('Listening on 3000');
        const { response } = ctx;
        response.status = 200;
        response.body = {
            message: 'Hello'
        }

    })
    

const app = new Application();

app.use(staticFileMiddleware)
app.use(handleErrors);
app.use(router.routes());

app.listen({ port: 3000 });
console.log(bgGreen(black("Server started on port 3000")));

async function handleErrors(
    context: Context,
    next: () => Promise<void>   
  ) {
    try {
      if (context.response.status === 404) {
        context.response.body = { 
          message : 'route not found'
         };  
        context.response.type = "json"; 

      }
      else {
        await next();
      }
      
    } catch (err) {
      context.response.status = err.status;
      const { message = "unknown error", status = 500, stack = null } = err;
      context.response.body = { message, status, stack };
      context.response.type = "json";
    }
}
