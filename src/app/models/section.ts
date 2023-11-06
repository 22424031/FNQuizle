export class  Section{
    private _keyword: string;
    public get keyword(): string {
        return this._keyword;
    }
    public set keyword(value: string) {
        this._keyword = value;
    }
    description: string; 
    image: string; 
   private _urlimage: any;
    public get urlimage(): string {
        return this._urlimage;
    }
    public set urlimage(value: string) {
        this._urlimage = value;
    }
    isactive:boolean;
    imgs:string[];
}