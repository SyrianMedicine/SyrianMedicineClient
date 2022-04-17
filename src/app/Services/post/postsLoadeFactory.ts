import { Observable } from "rxjs"
import { DynamicPagination } from "src/app/Models/Helper/DynamicPagination";
import { AccountService } from "../Account/account.service";
import { BaseServices } from "../Common/BaseService.service";
import { PostService } from "./post.service";

export abstract class postsLoadeFactory {
 
    static getProfileLoadMethod(loadeServices:AccountService,username: string | any):(page: DynamicPagination) => Promise<Observable<any>> {
       return async (page: DynamicPagination): Promise<Observable<any>> => {
            return await loadeServices.getProfilePost(username, page);
        };
    }
    static getHomePostLoadMethod(loadeServices: PostService): (page: DynamicPagination) => Promise<Observable<any>> { 
        return async (page: DynamicPagination): Promise<Observable<any>> => {
            return await loadeServices.getHomePost(page);
        };
    }
}