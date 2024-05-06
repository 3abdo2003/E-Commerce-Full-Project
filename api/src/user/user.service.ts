/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserService') private readonly userClient: ClientKafka,
    ) {}
    async login(command): Promise<any> {
        try {
            const response = await this.userClient.send('login', command).toPromise();
            return response;
        } catch (error) {
            console.error('Error occurred:', error);
            throw error; // Rethrow the error for the caller to handle
        }
    }

    async resetPasswordRequest(command): Promise<any> {
        try {
            const response = await this.userClient.send('reset-password-request', command).toPromise();
            return response;
        } catch (error) {
            console.error('Error occurred:', error);
            throw error; // Rethrow the error for the caller to handle
        }
    }

    async resetPassword(command): Promise<any> {
        try {
            const response = await this.userClient.send('reset-password', command).toPromise();
            return response;
        } catch (error) {
            console.error('Error occurred:', error);
            throw error; // Rethrow the error for the caller to handle
        }
    }
    
    
    
}
