import { PostOutput } from "../Post/PostOutput";
import { usercard } from "../usercard/usercard";

export class CommentOutput{
        id:number|any;
        text:string|any;
        datetime:Date|any;
        isEdited:boolean|any;
        relatedObjectType:string|any;
        realtedObjectId:string|any;
        user:usercard|any;
        onPost:PostOutput|any;
        onAccount:usercard|any;
        onComment:CommentOutput|any;
} 