import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService{

    constructor(private http: Http){
        
    }

    addUser(newUser){
        console.log("userinformation");
        console.log(newUser);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/api/userInfo', JSON.stringify(newUser), {headers: headers})
            .map(res => res.json());
    }
}