import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'dateOfBirth', 'email', 'status', 'hourlyRate', 'actions'];
  gList: string[] = ['Male', 'Female', 'Others'];
  dataSource: MatTableDataSource<any>;
  formexpand = false;
  tableexpand = true;
  isEdit = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  userform: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.createForm();
    this.getUsers();
  }

  onSubmit(data) {
    this.userService.create(data).then(() => {
      this.clearForm();
      this.getUsers();
      this.formexpand = false;
    });
  }
  onUpdate(row) {
    this.userService.updateUser(row).then(() => {
      this.clearForm();
      this.getUsers();
      this.isEdit = false;
      this.formexpand = false;
    });
  }
  deleteUser(id: number) {
    if (confirm('Are you sure to delete ?')) {
      this.userService.deleteUser(id).then(() => {
        this.getUsers();
      });
    }
  }
  editUser(row) {
    this.userform.get('id').setValue(row.id);
    this.userform.get('name').setValue(row.name);
    this.userform.get('dateOfBirth').setValue(row.dateOfBirth);
    this.userform.get('email').setValue(row.email);
    this.userform.get('status').setValue(row.status);
    this.userform.get('hourlyRate').setValue(row.hourlyRate);
    this.formexpand = true;
    this.isEdit = true;
  }
  getUsers() {
    this.userService.getUsers().then(res => {
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  createForm() {
    this.userform = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      status: [null, [Validators.required]],
      hourlyRate: [null, [Validators.required]],
    });
  }

  getErrorMessages(ele) {
    switch (ele) {
      case 'name': return this.userform.get('name').hasError('required') ? 'Field is required.' : 'Not a valid Name.';
      case 'dateOfBirth': return this.userform.get('dateOfBirth').hasError('required') ? 'Field is required.' : 'Not a valid Date of Birth.';
      case 'email': return this.userform.get('email').hasError('required') ? 'Field is required.' : 'Not a valid Email.';
      case 'status': return this.userform.get('status').hasError('required') ? 'Field is required.' : 'Not a valid Status.';
      case 'hourlyRate': return this.userform.get('hourlyRate').hasError('required') ? 'Field is required.' : 'Not a valid Hourly Rate.';
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  clearForm() {
    this.userform.reset();
    let control: AbstractControl = null;
    this.userform.markAsUntouched();
    Object.keys(this.userform.controls).forEach((name) => {
      control = this.userform.controls[name];
      control.setErrors(null);
    });
    this.isEdit = false;
  }
}

