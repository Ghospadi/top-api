import {AuthDto} from './../src/auth/dto/auth.dto';
import {CreateReviewDto} from './../src/review/dto/create-review.dto';
import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {disconnect, Types} from 'mongoose';
import {REVIEW_NOT_FOUND} from '../src/review/dto/review.constants';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
    name: 'Test',
    title: 'title',
    description: 'description',
    rating: 5,
    productId,
};

const loginDto: AuthDto = {
    login: 'lox321@gmail.com',
    password: 'ddddddd',
};

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let createdId: string;
    let token: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const {body} = await request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto);
        token = body.access_token;
    });

    it('/review/create (POST) - success', async () => {
        console.log(testDto);
        return request(app.getHttpServer())
            .post('/review/create')
            .send(testDto)
            .expect(201)
            .then(({body}: request.Response) => {
                createdId = body._id;
                expect(createdId).toBeDefined();
            });
    });

    it('/review/create (POST) - failt', async () => {
        return request(app.getHttpServer())
            .post('/review/create')
            .send({...testDto, rating: 0})
            .expect(400);
    });

    it('/review/byProduct/:productId (GET) - success', async () => {
        return request(app.getHttpServer())
            .get('/review/byProduct/' + productId)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .then(({body}: request.Response) => {
                expect(body.length).toBe(1);
            });
    });

    it('/review/byProduct/:productId (GET) - failed', async () => {
        return request(app.getHttpServer())
            .get('/review/byProduct/' + new Types.ObjectId().toHexString())
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .then(({body}: request.Response) => {
                expect(body.length).toBe(0);
            });
    });

    it('/review/:id (DELETE) - success', () => {
        return request(app.getHttpServer())
            .delete('/review/' + createdId)
            .set('Authorization', 'Bearer ' + token)
            .expect(200);
    });

    it('/review/:id (DELETE) - fail', () => {
        return request(app.getHttpServer())
            .delete('/review/' + new Types.ObjectId().toHexString())
            .set('Authorization', 'Bearer ' + token)
            .expect(404, {
                statusCode: 404,
                message: REVIEW_NOT_FOUND,
            });
    });

    afterAll(() => {
        disconnect();
    });
});
