import db from './../models'

class AuthService {
    private userModel: any
    constructor() {
        this.userModel = db.user;
    }

    async create(user: Object){
        try{
            return await this.userModel.create(user);
        } catch(err){
            throw err;
        }
    }
    
    
    async getOne(filterKey: string, filterValue:string ){
        try{
            return await this.userModel.findOne({where: {[filterKey]:  filterValue}});
        } catch(err){
            throw err;
        }
    }
}

export default AuthService

