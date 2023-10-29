export interface User{
    id?: string;
    username: string;
    password: string;
    full_name?: string;
    email?: string;
    date_of_birth : Date;
    description? : string;
    status:boolean;
    access_token: string;
}
