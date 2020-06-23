import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Componentes } from './componentes.model';

@Injectable()
export class ComponentesService {
  selectedComponentes: Componentes;
  componentes: Componentes[];
  readonly baseURL = 'http://localhost:3000/componentes';

  constructor(private http: HttpClient) { }

  postComponentes(comp: Componentes) {
    return this.http.post(this.baseURL, comp);
  }

  getComponentesList() {
    return this.http.get(this.baseURL);
  }

  putComponentes(comp: Componentes) {
    return this.http.put(this.baseURL + `/${comp._id}`, comp);
  }

  deleteComponentes(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}