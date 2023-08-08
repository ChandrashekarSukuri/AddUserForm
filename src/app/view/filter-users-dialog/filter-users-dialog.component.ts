import { Component, ElementRef, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-filter-users-dialog',
  templateUrl: './filter-users-dialog.component.html',
  styleUrls: ['./filter-users-dialog.component.scss'],
})
export class FilterUsersDialogComponent {
  private positionRelativeToElement: ElementRef;

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

  usersFilterForm: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FilterUsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public options: { positionRelativeToElement: ElementRef; usersFilter: any }
  ) {
    this.positionRelativeToElement = options.positionRelativeToElement;
  }

  ngOnInit() {
    const matDialogConfig = new MatDialogConfig();
    const bodyRect = document.body.getBoundingClientRect();
    const rect: DOMRect =
      this.positionRelativeToElement.nativeElement.getBoundingClientRect();
    matDialogConfig.position = {
      right: bodyRect.right - rect.right + 'px',
      top: rect.top - bodyRect.top - 250 + 'px',
    };
    this.dialogRef.updatePosition(matDialogConfig.position);

    this.usersFilterForm = this.fb.group({
      designation: [this.options.usersFilter.designation],
      gender: [this.options.usersFilter.gender],
    });
  }

  filterUsers() {
    this.dialogRef.close(this.usersFilterForm.value);
  }
}
