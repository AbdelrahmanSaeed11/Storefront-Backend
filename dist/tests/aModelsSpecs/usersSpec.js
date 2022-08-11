"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../models/users");
const myuser = new users_1.Users();
describe('Test users model', () => {
    it('Test index method to be defined', () => {
        expect(myuser.index).toBeDefined();
    });
    it('Test show method to be defined', () => {
        expect(myuser.show).toBeDefined();
    });
    it('Test create method to be defined', () => {
        expect(myuser.create).toBeDefined();
    });
    it('Test login method to be defined', () => {
        expect(myuser.login).toBeDefined();
    });
    it('Test update method to be defined', () => {
        expect(myuser.update).toBeDefined();
    });
    it('Test delete method to be defined', () => {
        expect(myuser.delete).toBeDefined();
    });
    it('Test that create method work', async () => {
        const inputUser = {
            user_name: 'user1',
            first_name: 'user1_fn',
            last_name: 'user1_ln',
            password: 'user1_password',
        };
        const ret = await myuser.create(inputUser);
        expect(ret).toEqual({
            id: 1,
            user_name: 'user1',
            first_name: 'user1_fn',
            last_name: 'user1_ln',
        });
    });
    it('Test that index method work', async () => {
        const ret = await myuser.index();
        expect(ret).toEqual([{
                id: 1,
                user_name: 'user1',
                first_name: 'user1_fn',
                last_name: 'user1_ln',
            }]);
    });
    it('Test that show method work', async () => {
        const ret = await myuser.show('1');
        expect(ret).toEqual({
            id: 1,
            user_name: 'user1',
            first_name: 'user1_fn',
            last_name: 'user1_ln',
        });
    });
    it('Test that login method work', async () => {
        const ret = await myuser.login('user1', 'user1_password');
        expect(ret).toEqual({
            id: 1,
            user_name: 'user1',
            first_name: 'user1_fn',
            last_name: 'user1_ln',
        });
    });
    it('Test that update method work', async () => {
        const ret = await myuser.update({
            id: 1,
            user_name: 'user1_AfterUpdate',
            first_name: 'user1_fn_AfterUpdate',
            last_name: 'user1_ln_AfterUpdate',
            password: 'user1_password_AfterUpdate',
        });
        expect(ret).toEqual({
            id: 1,
            user_name: 'user1_AfterUpdate',
            first_name: 'user1_fn_AfterUpdate',
            last_name: 'user1_ln_AfterUpdate',
        });
    });
    it('Test that login method work after update', async () => {
        const ret = await myuser.login('user1_AfterUpdate', 'user1_password_AfterUpdate');
        expect(ret).toEqual({
            id: 1,
            user_name: 'user1_AfterUpdate',
            first_name: 'user1_fn_AfterUpdate',
            last_name: 'user1_ln_AfterUpdate',
        });
    });
    it('Test that delete method work', async () => {
        const ret = await myuser.delete('1');
        expect(ret).toEqual({
            id: 1,
            user_name: 'user1_AfterUpdate',
            first_name: 'user1_fn_AfterUpdate',
            last_name: 'user1_ln_AfterUpdate',
        });
    });
});
