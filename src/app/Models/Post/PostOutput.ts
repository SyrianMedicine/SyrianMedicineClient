import { TagOutput } from "../tags/TagOutput";
import { usercard } from "../usercard/usercard";
export class PostOutput {
    id: number | any;
    userName: string | any;
    postTitle: string | any;
    mediaUrl:string|any;
    postText: string | any; 
    medialUrl: string | any;
    type:number|any;
    isEdited:boolean|any;
    user!:usercard;
    tags:Array<TagOutput>|any;
}