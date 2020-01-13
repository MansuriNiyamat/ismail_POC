import { Injectable, OnInit } from '@angular/core';
import { FeathersService } from '../shared/feathers.service';
import {UserModel } from './../shared/index';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userService = this.feathers.createService<UserModel>('user');
  constructor(
    private feathers: FeathersService
  ) { }

  create(user: UserModel) {
    return this.userService.create(user);
  }

  async getUsers(): Promise<any> {
   return await this.userService.find({
    paginate: false,
    query: {
      $limit: 100
    }
  });
  }
  async deleteUser(id: number): Promise<UserModel> {
    return await this.userService.remove(id);
  }
  async updateUser(data): Promise<UserModel> {
    return await this.userService.update(data.id, data);
  }
}
