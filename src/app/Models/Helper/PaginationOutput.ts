import { DynamicPagination } from "./DynamicPagination";
import { Pagination } from "./Pagination";

export class PaginationOutput{
    pageNumber:number=0; 
    totalPages:number=0;//defult -1 
    totalItem:number=0;
    itemsPerPage:number=3;
    constructor(PageSize:number=3){
        this.itemsPerPage=PageSize;
    }
   public isEnded():boolean{
        return this.totalPages<=this.pageNumber;
    }
   public getNextDynamicPaginationObject():DynamicPagination{
        let paginatoion:DynamicPagination=new DynamicPagination();
        paginatoion.oldTotal= this.totalItem;
        paginatoion.pageNumber=this.pageNumber+1;
        paginatoion.pageSize=this.itemsPerPage;
        return paginatoion;
    }
   public getNextPaginationObject():Pagination{
        let paginatoion:Pagination=new Pagination(); 
        paginatoion.pageNumber=this.pageNumber+1;
        paginatoion.pageSize=this.itemsPerPage;
        return paginatoion;
    }
   public update(data:any) {
      this.pageNumber=data.currentPage;
      this.totalPages=data.totalPages;
      this.totalItem=data.totalItems;
      this.itemsPerPage=data.itemsPerPage;
    }
}