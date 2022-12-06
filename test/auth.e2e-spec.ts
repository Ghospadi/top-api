import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {disconnect} from 'mongoose';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {AuthDto} from '../src/auth/dto/auth.dto';

const loginDto: AuthDto = {
    login: 'lox321@gmail.com',
    password: 'ddddddd',
};

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let createdId: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/login (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto)
            .expect(200)
            .then((res: request.Response) => {
                expect(res.body.access_token).toBeDefined();
            })
    });

    it('/auth/login (POST) - faild password', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({...loginDto, password: '1'})
            .expect(401);
    });

    it('/auth/login (POST) - faild login', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({...loginDto, login: 'dsadas@dsafca.cra'})
            .expect(401);
    });

    afterAll(() => {
        disconnect();
    });
});
