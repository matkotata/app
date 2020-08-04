import { Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { ApiResponse } from "src/misc/api.response.class";
import { UserDto } from "src/dtos/user/add.user.dto";
import * as crypto from "crypto";
import { EditPasswordUserDto } from "src/dtos/user/editPassword.user.dto";
import { resolve } from "path";

@Injectable()
export class UserService {
    constructor( @InjectRepository(User) private readonly user: Repository<User> ){}

    getAll(): Promise<User[]>{
        return this.user.find();
    }

    getById(id): Promise<User | ApiResponse> {
        return new Promise(resolve=> {
            this.user.findOne(id)
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                resolve(new ApiResponse("error",-1001));
            })
        });
    }

    getOnlyEmail(id): Promise<string | ApiResponse> {
        return new Promise((resolve) => {
            this.user.findOne(id)
            .then(user => {
                resolve(user.email);
            })
            .catch(err => {
                resolve(new ApiResponse("error",-1001));
            })
        });
    }

    add(data: UserDto): Promise<User | ApiResponse> {
        let passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        let newUser = new User();
        newUser.email = data.email;
        newUser.forname = data.forname;
        newUser.surname = data.surname;
        newUser.passwordHash = passwordHashString;
        newUser.phoneNumber = data.phoneNumber;
        newUser.postalAddress = data.postalAddress;

        return new Promise(resolve => {
            this.user.save(newUser)
            .then(data => {
                resolve(data);
            })
            .catch(() => {
                resolve(new ApiResponse("err",-1003));
            })
        })
    }

    editPassword(id: number, data: EditPasswordUserDto): Promise<User | ApiResponse> {
        return new Promise(resolve => {
            this.user.findOne(id)
            .then(newUser => {
                let passwordHash = crypto.createHash('sha512');
                passwordHash.update(data.password);
                const passwordHashString = passwordHash.digest('hex').toUpperCase();
                newUser.passwordHash = passwordHashString;
                this.user.save(newUser)
                .then(data => {
                    resolve(data);
                })
                .catch(() => {
                    resolve(new ApiResponse("error", -1002));
                })
            })
            .catch(() => {
                resolve(new ApiResponse("error", -1001));
            })
        })
    }

}