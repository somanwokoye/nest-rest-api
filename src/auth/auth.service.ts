import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    /**
     * this function will be called each time a user is to be validated on the basis of primaryEmailAddress and password
     * It takes for granted that the password stored in database is hashed with bcrypt and the password being passed here
     * is a plain password, received from the client request, hopefully through a secure tls channel
     * @param email 
     * @param password 
     */
    async validateUser(email: string, passwordPlainText: string) {

        const user = await this.usersService.findByPrimaryEmailAddress(email);

        if (user) {
            //use bcrypt to compare plaintext password and the hashed one in database
            const isPasswordMatched = await bcrypt.compare(
                passwordPlainText,
                user.passwordHash
            );

            if (!isPasswordMatched) {
                return null; //password does not match
            }

            const { passwordHash, passwordSalt, resetPasswordToken,
                primaryEmailVerificationToken, backupEmailVerificationToken, 
                emailVerificationTokenExpiration, otpSecret, 
                ...restOfUserFields } = user; //read off passwordHash, tokens, etc. so that they are not carried around with user object
            return restOfUserFields;//alternatively, consider returning just a few necessary fields to avoid overfetching.
        }else{
            return null; //user does not exist
        }

    }
}
