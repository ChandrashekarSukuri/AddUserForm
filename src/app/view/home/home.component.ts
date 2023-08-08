import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { FilterUsersDialogComponent } from '../filter-users-dialog/filter-users-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userForm: any;
  hide = true;
  addUsersHeading = 'Add Users';
  @ViewChild('filterBtn', { static: false }) public filterBtn!: MatButton;
  usersList: User[] = [];
  sortedData: User[] = [];
  displayedColumns: string[] = [
    'userName',
    'designation',
    'email',
    'age',
    'gender',
  ];
  designations: any[] = [
    {
      id: 1,
      name: 'Developer',
    },
    {
      id: 2,
      name: 'Tester',
    },
    {
      id: 3,
      name: 'Devops Engineer',
    },
    {
      id: 4,
      name: 'HR Manager',
    },
  ];
  genders: any[] = [
    {
      id: 1,
      name: 'Male',
    },
    {
      id: 2,
      name: 'Female',
    },
    {
      id: 3,
      name: 'Others',
    },
  ];

  usersFilter = {
    designation: '',
    gender: '',
  };

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private changeDetect: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  addUser() {
    if (this.userForm.valid) {
      this.usersList.push(this.userForm.value);
      setTimeout(() => {
        this.sortedData = [...this.usersList];
        this.sortedData = [...this.sortedData];
        this.userForm.reset();
        this.changeDetect.detectChanges();
      }, 1000);
    }
  }

  sortData(sort: Sort) {
    const data = this.usersList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'userName':
          return this.compare(a.userName, b.userName, isAsc);
        case 'email':
          return this.compare(a.email, b.email, isAsc);
        case 'designation':
          return this.compare(a.designation, b.designation, isAsc);
        case 'age':
          return this.compare(a.age, b.age, isAsc);
        case 'gender':
          return this.compare(a.gender, b.gender, isAsc);
        default:
          return 0;
      }
    });

    this.sortedData = [...this.sortedData];
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    if (typeof a == 'string' && typeof b == 'string') {
      a = a.toLowerCase();
      b = b.toLowerCase();
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public openDialog() {
    const dialogRef: MatDialogRef<FilterUsersDialogComponent> =
      this.dialog.open(FilterUsersDialogComponent, {
        hasBackdrop: false,
        height: '300px',
        width: '400px',
        data: {
          positionRelativeToElement: this.filterBtn._elementRef,
          usersFilter: this.usersFilter,
        },
      });

    dialogRef.afterClosed().subscribe((result) => {
      this.usersFilter.designation = result.designation
        ? result.designation
        : '';
      this.usersFilter.gender = result.gender ? result.gender : '';
      this.filterUsersData();
    });
  }

  filterUsersData() {
    const usersFilterClone: any = { ...this.usersFilter };
    Object.keys(usersFilterClone).forEach(
      (k) => !usersFilterClone[k] && delete usersFilterClone[k]
    );
    const usersListFilteredData = this.usersList.filter((user) => {
      if (usersFilterClone.designation && usersFilterClone.gender) {
        return (
          user.designation == usersFilterClone.designation &&
          user.gender == usersFilterClone.gender
        );
      } else if (usersFilterClone.designation) {
        return user.designation == usersFilterClone.designation;
      } else if (usersFilterClone.gender) {
        return user.gender == usersFilterClone.gender;
      }
      return true;
    });

    this.sortedData = [...usersListFilteredData];
  }
}

interface User {
  userName: string;
  email: string;
  age: string;
  designation: string;
  gender: string;
}
