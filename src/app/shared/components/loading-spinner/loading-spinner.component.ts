import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerService } from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent implements OnInit {
  loading$: Observable<boolean>;
  constructor(private _loadingSpinnerService: LoadingSpinnerService) {}

  ngOnInit() {
    this.loading$ = this._loadingSpinnerService.getLoading();
  }
}
