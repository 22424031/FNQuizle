export class StudySet{
    title:string;
    description:string
    keywordLang:string
    descriptionLang:string
    studySetDetails: StudySetDetail[]
}
export class StudySetDetail {
    keyword:string
    description:string
    urlImage:string
    isActive:boolean
}