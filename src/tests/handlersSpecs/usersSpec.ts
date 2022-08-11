import supertest from "supertest";
import jwt, { JwtPayload } from 'jsonwebtoken'
import app from "../../server";
import { user } from "../../models/users";

const request = supertest(app); 

let userToken: string;

describe('Test users handler', () => {
    it('Test create route', async () => {
        const inputUser: user = {
            user_name: 'user3',
            first_name: 'user3_fn',
            last_name: 'user3_ln',
            password: 'user3_password123',
        }
        const ret = await request.post('/api/users')
            .send(inputUser);
        userToken = ret.body;
        const retToken = jwt.verify(ret.body, process.env.jwt_token as string);
        const retUser: user = ((retToken as JwtPayload).user as user);
        expect(retUser).toEqual({
            id: 3,
            user_name: 'user3',
            first_name: 'user3_fn',
            last_name: 'user3_ln',
        });
    })

    it('Test index route', async () => {
        const ret = await request.get('/api/users')
            .set('authorization', `Bearer ${userToken}`)
        expect(ret.body).toEqual([{
            id: 3,
            user_name: 'user3',
            first_name: 'user3_fn',
            last_name: 'user3_ln',
        }])
    })

    it('Test show route', async () => {
        const ret = await request.get('/api/users/3')
            .set('authorization', `Bearer ${userToken}`);
        expect(ret.body).toEqual({
            id: 3,
            user_name: 'user3',
            first_name: 'user3_fn',
            last_name: 'user3_ln',
        })
    })

    it('Test login route', async () => {
        const ret = await request.post('/api/users/login').send({
            user_name: 'user3',
            password: 'user3_password123',
        });
        const retToken = jwt.verify(ret.body, process.env.jwt_token as string);
        const retUser: user = ((retToken as JwtPayload).user as user);
        expect(retUser).toEqual({
            id: 3,
            user_name: 'user3',
            first_name: 'user3_fn',
            last_name: 'user3_ln',
        });
    })

    it('Test update route', async () => {
        const ret = await request.put('/api/users')
            .set('authorization', `Bearer ${userToken}`)
            .send({
                id: 3,
                user_name: 'user3_afterUpd',
                first_name: 'user3_fnUpd',
                last_name: 'user3_lnUpd',
                password: 'user3_password1234',
            });
        expect(ret.body).toEqual({
            id: 3,
            user_name: 'user3_afterUpd',
            first_name: 'user3_fnUpd',
            last_name: 'user3_lnUpd',
        });
    })

    it('Test delete route', async () => {
        const ret = await request.delete('/api/users/3')
            .set('authorization', `Bearer ${userToken}`);
        expect(ret.body).toEqual({
            id: 3,
            user_name: 'user3_afterUpd',
            first_name: 'user3_fnUpd',
            last_name: 'user3_lnUpd',
        })
    })
})