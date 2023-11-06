import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { SearchImageService } from './services/search-image.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.scss']
})
export class SearchImageComponent implements OnInit {
  panelOpenState = false;
  constructor( private searchService : SearchImageService, private changeDetectorRef: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
  }
 
  keyword: string;
  imgSelect :string;
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() index:number;
  @Input() public  imgs:string[] = [];
  panelEventOpen(){

  }
  panelEventClose(){
    //this.imgs = []
  }
  imgClick(url:string){
    this.newItemEvent.emit(url+';'+this.index.toString());
  }
  searchKeyword(){
    let imgResult = this.searchService.getAll(this.keyword).subscribe(sp =>{
      if(sp.status === 200){
        this.imgs = sp.data;
        console.log(this.imgs);
        this.ngOnInit();
      
      }
      
    });
  }

}
