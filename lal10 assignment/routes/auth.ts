import {NextFunction, Router} from 'express'
import Auth from '../controllers/auth';
// import catchError from '../utils/errorHandlerdecorator';
import {validate} from 'express-validation';
import { loginValidation, regestrationValidation } from '../middleware/validation';

const router: any  = Router();

router.route('/login').post(validate(loginValidation,{},{}),async (req: any, res: any, next: NextFunction) => {
    let authService = new Auth();
    let result: any = await authService.login(req.body, next)
    res.status(result.code).json(result);
})


router.route('/register').post(validate(regestrationValidation,{},{}), async (req: any, res: any, next: NextFunction) => {
    console.log('hello')
    let authService = new Auth();
    let result: any  = await authService.register(req.body, next)
    res.status(result.code).json(result);
})


export default router