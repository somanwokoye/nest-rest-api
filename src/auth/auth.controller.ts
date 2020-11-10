import { Controller, Get, Req, Post, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { API_VERSION } from 'src/global/app.settings';
import { Reply, Request } from 'src/global/custom.interfaces';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {

    @Get('login')
    loginForm(@Res() reply: Reply) {
        reply.view('auth/login.html',
            {
                apiVersion: API_VERSION !== null ? `${API_VERSION}` : '',
                loginUrl: API_VERSION !== null ? `/${API_VERSION}/auth/login` : '/auth/login',
                forgotPasswordUrl: API_VERSION !== null ? `/${API_VERSION}/users/reset-password-request` : '/users/reset-password-request',
                title: 'SGVI-1 Mini CMS Login',
                loginActive: 'true'
            })
    }

    /**
     * The following gist from https://docs.nestjs.com/techniques/authentication#login-route is important for understanding what is going on here
     * "With @UseGuards(AuthGuard('local')) we are using an AuthGuard that @nestjs/passport automatically 
     * provisioned for us when we extended the passport-local strategy. 
     * Let's break that down. Our Passport local strategy has a default name of 'local'.
     * We reference that name in the @UseGuards() decorator to associate it with code supplied by the 
     * passport-local package. 
     * This is used to disambiguate which strategy to invoke in case we have multiple Passport strategies in our app 
     * (each of which may provision a strategy-specific AuthGuard)"
     * @param req 
     */
    //@UseGuards(AuthGuard('local')) //This works but better to first define a custom guard for it and use it here as I have used below
    @UseGuards(LocalAuthGuard)//LocalAuthGuard was defined in auth/guards/local-auth.guard.ts. Check it out
    @Post('login') //this does not conflict with the login url above for displaying login form. That is a Get and this is a Post.
    async login(@Req() req: Request) {
        return req.user;
    }

}
