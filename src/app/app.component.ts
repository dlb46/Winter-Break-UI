import { Component } from '@angular/core';
import { EndpointService } from './services2/endpoint.service';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { HttpService } from './services2/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	//endpoint holds data
	endpoint:any;
	arrayOfKeys: Array<string>;
	public myForm: FormGroup;
	response: any;

	constructor(private endpointService: EndpointService, private fb: FormBuilder, 
		private httpService: HttpService) {
	}

	getEndpoint(): void {
		this.endpoint = this.endpointService.getInfo();
	}

	ngOnInit() {
		this.getEndpoint();
		this.makeHeaderKeys();
		this.myForm = this.fb.group({
			body: this.fb.array([])
		});

		if (this.endpoint.hasOwnProperty('body')) {
			for (let body of this.endpoint.body) {
				if (body.name == 'email') {
					this.addEmail(body);
				}
				else if (body.name == 'full-name') {
					this.addName(body);
				}
				else if (body.name == 'phone') {
					this.addPhone(body);
				}
			}
		}
		
	}

	patternFix(pattern: string): string {
		//The /\d\d\d-\d\d\d\d/ pattern was not working
		if (pattern == '/\d\d\d-\d\d\d\d/') {
			return '[0-9]{3}-[0-9]{4}'
		}
		return pattern;
	}

	initPhone(inp: any) {
		return this.fb.group({
			name: ['Phone'],
			type: ['tel'],
			pattern: [inp.pattern],
			input: ['', Validators.pattern(this.patternFix(inp.pattern))]
		})
	}

	addPhone(input: any) {
		const control = <FormArray>this.myForm.controls['body']
		control.push(this.initPhone(input));
	}

	initName(inp: any) {
		return this.fb.group({
			name: ['Full name'],
			type: ['text'],
			placeholder: [inp.placeholder],
			input: ['', [Validators.required]]
		});
	}

	addName(input: any) {
		const control = <FormArray>this.myForm.controls['body']
		control.push(this.initName(input));
	}

	initEmail(inp: any) {
		return this.fb.group({
			name: ['Email'],
			type: ['email'],
			min: [inp.min],
			max: [inp.max],
			input: ['', [Validators.minLength(inp.min), Validators.maxLength(inp.max)]]
		});
	}

	addEmail(input: any) {
		const control = <FormArray>this.myForm.controls['body'];
		control.push(this.initEmail(input));
	}


	makeHeaderKeys() {
		this.arrayOfKeys = Object.keys(this.endpoint.headers)
	}

	formatString(str: string): string {
		//Removes hyphen and capitalizes first letter of first word
		var removeHyphen = str.replace('-',' ');
		var capitalize = removeHyphen.charAt(0).toUpperCase()+removeHyphen.slice(1)
		return capitalize;
	}

	submit(model: any) {
		if (this.endpoint.method == 'GET') {
			this.httpService.get(this.endpoint.url).subscribe(
				data => this.response = data,
				error => this.response = error);
		}
		else if (this.endpoint.method == 'POST') {
			this.httpService.post(this.endpoint.url, model).subscribe(
				data => this.response = data,
				error => this.response = 'Error: '+ error);
		}
		else if (this.endpoint.method == 'PUT') {
			this.httpService.put(this.endpoint.url, model).subscribe(
				data => this.response = data,
				error => this.response = 'Error: '+ error);
		}
		else {
			this.httpService.delete(this.endpoint.url).subscribe(
				data => this.response = data,
				error => this.response = 'Error: '+ error);
		}
	}

	displayJSON(): any {
		return JSON.stringify(this.response);
	}

}
