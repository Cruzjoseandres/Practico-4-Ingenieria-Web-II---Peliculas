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

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = this.userRepository.create({
            username: createUserDto.username,
            fullName: createUserDto.fullName,
            password: hashedPassword,
        });
        return this.userRepository.save(newUser);
    }
}
