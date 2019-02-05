import { Injectable } from '@angular/core';
import { endpoint } from '../../assets/api/mock-endpoint3';

@Injectable()
export class EndpointService {

  constructor() { }

  getInfo() {
  	return endpoint
  }

}
