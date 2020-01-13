import { Injectable, OnInit } from '@angular/core';
import { FeathersService } from '../shared/feathers.service';
import {JobModel} from './../shared/index';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  jobSer = this.feathers.createService<JobModel>('job');
  constructor(
    private feathers: FeathersService
  ) { }

  async create(job: JobModel) {
    return await this.jobSer.create(job);
  }
  async getJobs(): Promise<any> {
   return await this.jobSer.find({
    paginate: false,
    query: {
      $limit: 100
    }
  });
  }
  async deleteJob(id: number): Promise<any> {
    return await this.jobSer.remove(id);
  }
  async updateJob(data): Promise<any> {
    return await this.jobSer.update(data.id, data);
  }
}
