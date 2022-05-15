import { UserTypes } from "../Enums/UserTypes";

export class usercard {
    userName:string|any;
    displayName:string|any;
    PictureUrl:string|any;
    gender!:number;
    userType!:UserTypes;
    
     getLink():string{
         
        if(this.userType!=UserTypes.Admin){
            return "/"+UserTypes[this.userType]+"/"+this.userName; 
        }
        else 
        return "/"+UserTypes[UserTypes.Sick]+"/"+this.userName; 
        
    }
}    