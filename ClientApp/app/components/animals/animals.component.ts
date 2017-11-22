import {
    Component,
    ViewEncapsulation,
    ViewChild,
    ElementRef
} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {
    MatDialog,
    MatSnackBar,
    MatSnackBarConfig,
    MatPaginator,
    MatSort
} from "@angular/material";

import { SampleFormComponent } from "../sampleform/samplefrom.component";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
    selector: 'animal-table',
    templateUrl: './animals.component.html',
    styleUrls: ['./animals.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AnimalTableComponent {
    displayedColumns = ['userId', 'userName', 'progress', 'color'];
    exampleDatabase = new ExampleDatabase();
    dataSource: ExampleDataSource | null;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(private dialog: MatDialog, public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) {
                    return;
                }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    public rowClickedHandler(x: UserData): void {
        const counter = this.dialog.open(SampleFormComponent, {
            height: '650px',
            width: '650px'
        });
        // counter.componentInstance.currentCount = +x.id;
        counter.afterClosed().subscribe(result => {
            if (true) {
                const s = this.snackBar.open("Bad Dog!", "Banish?", {
                    duration: 2000,
                    extraClasses: ['test'],
                    direction: "ltr"
                });
                s.onAction().subscribe(result => alert("You have been banished!"));
            }
        });
    }
}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
    'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
    'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
    'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

export interface UserData {
    id: string;
    name: string;
    progress: string;
    color: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);

    get data(): UserData[] {
        return this.dataChange.value;
    }

    constructor() {
        // Fill up the database with 100 users.
        for (let i = 0; i < 100; i++) {
            this.addUser();
        }
    }

    /** Adds a new user to the database. */
    addUser() {
        const copiedData = this.data.slice();
        copiedData.push(this.createNewUser());
        this.dataChange.next(copiedData);
    }

    /** Builds and returns a new User. */
    private createNewUser() {
        const name =
            NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
            NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

        return {
            id: (this.data.length + 1).toString(),
            name: name,
            progress: Math.round(Math.random() * 100).toString(),
            color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
        };
    }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');
    get filter(): string {
        return this._filterChange.value;
    }
    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator, private _sort: MatSort) {
        super();
    }

    private get SortedData(): UserData[] {
        const data = this._exampleDatabase.data.slice();
        if (!this._sort.active || this._sort.direction == '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._sort.active) {
                case 'userId':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'userName':
                    [propertyA, propertyB] = [a.name, b.name];
                    break;
                case 'progress':
                    [propertyA, propertyB] = [a.progress, b.progress];
                    break;
                case 'color':
                    [propertyA, propertyB] = [a.color, b.color];
                    break;
            }

            let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
        });
    }
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<UserData[]> {
        const displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._paginator.page,
            this._sort.sortChange,
            this._filterChange
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            const data = this.SortedData //this._exampleDatabase.data.slice();

            // Grab the page's slice of data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            return data.splice(startIndex, this._paginator.pageSize).filter((item: UserData) => {
                let searchStr = (item.name + item.color + item.id + item.progress + "%").toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) != -1;
            });;
        });
    }

    disconnect() { }

}