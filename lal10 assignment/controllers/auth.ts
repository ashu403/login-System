import bcryptjs from "bcryptjs"
import lodash from "lodash";
// import { BaseService } from "../utils/ServiceHandler";
import CustomError  from "../utils/error";
import { ResponseBodyWrapper } from "../utils/ResponseWrapper";
import jsonWebToken from 'jsonwebtoken';
import {config as JwtConfig} from './../configs/jwtConfig';
import { NextFunction } from "express";
import AuthService from "../services/authService";


class Auth {
    customError: any;
    private authService = new AuthService();
    constructor() {
        this.customError = new CustomError()
    }

    private async encrypt(password: string) {
        let salt = await bcryptjs.genSalt(16);
        let hashedPassword = await bcryptjs.hash(password, salt);
        return hashedPassword;
    }

    private async compare(check: string, from: string) {
        return await bcryptjs.compare(check, from);
    }

    private createAccessToken(user: any) {
        let secret: any = JwtConfig.secret;
        let token = jsonWebToken.sign({email: user.email, firstName: user.firstName, last_name: user.lastName}, secret);
        return token;
    }

    async login(userCerdentials: any, next: NextFunction) {
        try {
            let {email, password} = userCerdentials;
            let userProfile = await this.authService.getOne('email', email)
            if(lodash.isEmpty(userProfile)) {
                return this.customError.unAuthorized();
            }
            let correctUser: boolean = await this.compare(password, userProfile.password);
            if(!correctUser) {
                return this.customError.unAuthorized();
            }
            let token = this.createAccessToken(correctUser);
            return ResponseBodyWrapper(200, 'Password Validated', [{token: token}])
        } catch(err: any) {
            next(err);
        }
    }

    async register(userInformation: any, next: NextFunction) {
        try {
            let {firstName, lastName, email, password, userName} = userInformation
            let user: any = await this.authService.getOne('email', email);
            if(!lodash.isEmpty(user)) {
                return this.customError.duplicateError()
            }
            user = await this.authService.getOne('userName', userName);
            if(!lodash.isEmpty(user)) {
                return this.customError.badRequest("User Name Already In Use, Pls try a different User Name");
            }
            let encPass: string = await this.encrypt(password);
            await this.authService.create({firstName, lastName, email, password:encPass, userName});
            return ResponseBodyWrapper(200, 'User Registration Successful')
        } catch(err: any) {
            next(err)
        }
    }
}

export default Auth

