import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];
  dataSource: MatTableDataSource<any>;
  formexpand = false;
  tableexpand = true;
  isEdit = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  jobform: FormGroup;
  submitedData: JSON;
  panelOpenState = false;
  constructor(private formBuilder: FormBuilder, private jobService: JobService) { }

  ngOnInit() {
    this.createForm();
    this.getJobs();
  }

  onSubmit(data) {
    this.jobService.create(data).then(() => {
      this.clearForm();
      this.getJobs();
      this.formexpand = false;
    });
  }
  onUpdate(row) {
 this.jobService.updateJob(row).then(() => {
      this.clearForm();
      this.getJobs();
      this.isEdit = false;
      this.formexpand = false;
    });
  }
  deleteJob(id: number) {
    if (confirm('Are you sure to delete ?')) {
      this.jobService.deleteJob(id).then(() => {
        this.getJobs();
      });
    }
  }
  editJob(row) {
    this.jobform.get('id').setValue(row.id);
    this.jobform.get('title').setValue(row.title);
    this.jobform.get('description').setValue(row.description);
    this.formexpand = true;
    this.isEdit = true;
  }
  getJobs() {
    this.jobService.getJobs().then(res => {
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  createForm() {
    this.jobform = this.formBuilder.group({
      id: [null],
      title: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.minLength(10)]]
    });
  }

  getErrorMessages(ele) {
    switch (ele) {
      case 'title': return this.jobform.get('title').hasError('required') ? 'Field is required.' : 'Not a valid Email.';
      case 'description': return this.jobform.get('description').hasError('required')
        ? 'Field is required.' : 'Minimum 10 character required.';
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  clearForm() {
    this.jobform.reset();
    let control: AbstractControl = null;
    this.jobform.markAsUntouched();
    Object.keys(this.jobform.controls).forEach((name) => {
      control = this.jobform.controls[name];
      control.setErrors(null);
    });
  }
}
