import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';

export class User {
    constructor(public id: number,
                public name: string,
                public age: number,
                public occupation: string) {
    }
}

@Injectable()
export class UserService {
    private userUrl = 'http://localhost:8000/api/v1/';
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getUsers(name?: string): Observable<User[]> {
        return this.http.get(`${this.userUrl}users`, {params: {name}})
            .map((res: Response) => {
                return res.json()
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getUser(id: number | string) {
        return this.http.get(`${this.userUrl}users/${+id}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateUser(user: User) {

        const reqData = {
            "token": this.currentUser.token,
            "id": user.id,
            "data": {
                "age": user.age,
                "occupation": user.occupation,
            }
        };

        return this.http.put(`${this.userUrl}users/`, reqData)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteUser(user: User) {
        const reqData = {
            "token": this.currentUser.token,
            "id": user.id,
            "data": {
                "name": user.name,
                "age": user.age,
                "occupation": user.occupation,
            }
        };
        console.log(reqData);

        return this.http.delete(`${this.userUrl}users/`, reqData)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getLocations(id: number | string) {
        return this.http.get(`${this.userUrl}locations/${+id}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
