export class PostCreateInput { 
    PostTitle!: string ; 
    PostText!: string ; 
    Media:File|any;  
    type!:number; 
    TagsID!:Array<number>;
}