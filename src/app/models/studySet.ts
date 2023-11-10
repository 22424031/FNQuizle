export class StudySet{
    userName:string;
    id:number;
    title:string;
    description:string
    keywordLang:string
    descriptionLang:string
    studySetDetails: StudySetDetail[]
}
export class StudySetDetail {
    keyword:string
    description:string;
    image: Blob
    urlImage:any | string
    isActive:boolean
}