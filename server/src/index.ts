import { bgGreen, black, Application, Router, RouterContext, Context, send } from "../deps.ts";
import { staticFileMiddleware } from "./middlewares/staticFileMiddleware.ts";
import { auth } from './controllers/authController.ts';
import { ensureAuthenticated } from './middlewares/authMiddleware.ts';

const router = new Router();


router
    .get('/api/signup',ensureAuthenticated, (ctx: RouterContext) => {
        const { response } = ctx;
        response.status = 200;
        response.body = {
            status: 'success',
            message: 'Signed in successfully'
        }

    })
    

const app = new Application();

app.use(staticFileMiddleware);

app.use(router.routes());
app.use(auth.routes());


app.use(handleErrors);
app.listen({ port: 3000 });
console.log(bgGreen(black("Server started on port 3000")));

async function handleErrors(
    context: Context,
    next: () => Promise<void>   
  ) {
    try {
      if (context.response.status === 404) {
        context.response.status = 404;
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
