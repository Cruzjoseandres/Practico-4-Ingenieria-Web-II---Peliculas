import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const userExist = await this.userRepository.findOne({
            where: { username: createUserDto.username },
        });

        if (userExist) {
            throw new Error('El username ya esta en uso');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(
            createUserDto.password,
            saltRounds,
        );

        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        await this.userRepository.save(user);
        const usuarioCreado = {
            username: user.username,
            fullName: user.fullName,
        };
        return usuarioCreado;
    }

    async findAll() {
        const usuarios = await this.userRepository.find();

        const usuarioResponse = usuarios.map((usuarios) => ({
            username: usuarios.username,
            fullName: usuarios.fullName,
        }));
        return usuarioResponse;
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        await this.userRepository.update(id, updateUserDto);
        return await this.userRepository.findOne({ where: { id } });
    }

    async remove(id: number) {
        await this.userRepository.delete(id);
        return `This action removes a #${id} user`;
    }

    async findByUsername(username: string) {
        return this.userRepository.findOne({ where: { username } });
    }
}
