import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Contrato } from "../models/contrato";

@Injectable()
export class ContratosService {
  resourceURL: string;
  constructor(private httpClient: HttpClient) {
    this.resourceURL = "https://pavii.ddns.net/api/Contratos/";
  }
  get(): Observable<Contrato[]> {
    return this.httpClient.get<Contrato[]>(this.resourceURL);
  }

  getById(Id: number) {
    return this.httpClient.get(this.resourceURL + Id);
  }

  post(obj: Contrato) {
    return this.httpClient.post(this.resourceURL, obj);
  }

  put(Id: number, obj: Contrato) {
    return this.httpClient.put(this.resourceURL + Id, obj);
  }

  delete(Id) {
    return this.httpClient.delete(this.resourceURL + Id);
  }
}
