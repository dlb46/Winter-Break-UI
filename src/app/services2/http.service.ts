import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 	'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

//For testing
private url: string = 'https://jsonplaceholder.typicode.com/'

  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
 	return this.http.get(this.fixUrlGet(url))
 		.map(this.parseData)
 		.catch(this.handleError);
  }

  post(url: string, data: any): Observable<any> {
  	//Kind of confused how the posted data should be formatted
  	//so I just put into array.  If I knew format would be
  	//easy to put into that format
  	var inputs = []
  	for (let field of data) {
  		inputs.push(field.input);
  	}

  	return this.http.post(this.fixUrlPost(url), {
  		inputs

  	}).map(this.parseData)
  		.catch(this.handleError);
  }

  put(url: string, data: any): Observable<any> {
  	//Same uncertainty as post method
  	var inputs = []
  	for (let field of data) {
  		inputs.push(field.input);
  	}

  	return this.http.put(this.fixUrlPut(url), {
  		inputs

  	}).map(this.parseData)
  		.catch(this.handleError);
  }

  delete(url: string): Observable<any> {
  	return this.http.delete(this.fixUrlDelete(url))
  		.map(this.parseData)
  		.catch(this.handleError);
  }

  //For jsonplaceholder.typicode needed to add extensions that weren't included
  //in the base url, so added these functions to fix that.  If the base url is
  //input correctly, these functions are not needed

  private fixUrlGet(url: string): string {
  	if (url == 'https://jsonplaceholder.typicode.com/')
  		return url + 'todos/1';
  	return url;

  }

  private fixUrlPost(url: string): string {
  	if (url == 'https://jsonplaceholder.typicode.com/')
  		return url + 'posts';
  	return url;

  }

  private fixUrlPut(url: string): string {
  	if (url == 'https://jsonplaceholder.typicode.com/')
  		return url + 'posts/1';
  	return url;

  }

  private fixUrlDelete(url: string): string {
  	if (url == 'https://jsonplaceholder.typicode.com/')
  		return url + 'posts/1';
  	return url;

  }

  private parseData(res: Response) {
  		return res || [];
  }

  private handleError(error: Response | any) {
  		return Observable.throw(error.message);
  }

}
