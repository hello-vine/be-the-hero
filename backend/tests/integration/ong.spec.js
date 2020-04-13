const request = require('supertest');

const app = require('../../src/app');

const connection = require('../../src/database/connection');

describe('ONG', () => {

    // Acontece antes dos teste, faz conexao com as migrate
    // Desfaz e refaz as migrations
    beforeEach( async () => {

        await connection.migrate.rollback();

        await connection.migrate.latest();

    });

    // Para tudo no final dos testes
    afterAll( async () => {

        await connection.destroy();

    });

    it('should be able to create a new ONG', async () => {

        const response = await request(app).post('/ongs').send({

            name: "APAD-2",
            email: "contact@apad.com",
            whatsapp: "12345678910",
            city: "Rio do Sul",
            uf: "SC"
             
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

    });

});