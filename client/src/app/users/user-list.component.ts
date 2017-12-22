// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {User, UserService} from './user.service';
import {FormControl} from '@angular/forms';

@Component({
    templateUrl: './user-list.component.html',
    styleUrls: ['./user.css'],
})
export class UserListComponent implements OnInit {
    users: Observable<User[]>;
    public search: FormControl = new FormControl();

    constructor(private service: UserService) {
    }

    ngOnInit() {
        // this.search.valueChanges поток событий (Observable) изменения в input поиска
        // используя subscribe  можно обработать каждое событие
        this.users = this.search.valueChanges
        // до первого ввода в поле создать событие пустого ввода в потоке событий,
        // что-бы получить полный список пользователей без фильтрации
        // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-startWith
            .startWith('')
            // Observable будет обрабатывать события не чаще чем в заданом промежетке времени
            // таким образом запросы будут вызываться не чаще чем раз в 800 мс
            // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-debounceTime
            .debounceTime(800)
            // Observable будет обрабатывать событие только если значение отличается от предыдущего
            // http://reactivex.io/documentation/operators/distinct.html
            .distinctUntilChanged()
            // при каждом отфильтрованом событие будет вызыватся запрос и результат будет эмититсья как новое событие
            // в  данном слуяае это аналогично then в Promise
            // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap
            .switchMap(name => this.service.getUsers(name));
    }

}