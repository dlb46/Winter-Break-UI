import { Injectable } from '@angular/core';
import { endpoint } from '../../assets/api/mock-endpoint4';

@Injectable()
export class EndpointService {

  constructor() { }

  getInfo() {
  	return endpoint
  }

}
