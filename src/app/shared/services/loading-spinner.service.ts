import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  private _loading$ = new BehaviorSubject<boolean>(false);

  getLoading(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  setLoading(isLoading: boolean): void {
    this._loading$.next(isLoading);
  }
}
