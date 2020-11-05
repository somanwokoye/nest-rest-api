import { Controller, Get, Post, Res } from '@nestjs/common';
import { API_VERSION } from 'src/global/app.settings';
import { Reply } from 'src/global/custom.interfaces';

@Controller('auth')
export class AuthController {

    @Get('login')
    loginForm(@Res() reply: Reply) {
        reply.view('auth/login.html',
            {
                apiVersion: API_VERSION!==null? `${API_VERSION}`: '',
                loginUrl: API_VERSION !== null ? `/${API_VERSION}/auth/process-login` : '/auth/process-login',
                forgotPasswordUrl: API_VERSION !== null ? `/${API_VERSION}/users/reset-password-request` : '/users/reset-password-request',
                title: 'SGVI-1 Mini CMS Login', 
                loginActive: 'true'
            })
    }
}
