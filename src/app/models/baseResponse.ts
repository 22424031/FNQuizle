export interface BaseResponse<T>{
    data:T;
    status:number;
    errorCode:string;
    errorMessage:string;
   
}