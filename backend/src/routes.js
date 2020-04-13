const express = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const ong_controller = require( './controllers/ong-controller' );

const incident_controller = require( './controllers/incident-controller' );

const profile_controller = require( './controllers/profile-controller' );

const session_controller = require( './controllers/session-controller' );

const routes = express.Router();


routes.post( '/sessions', session_controller.create );


routes.get( '/ongs', ong_controller.index );

routes.post('/ongs', celebrate({
    
    [Segments.BODY]: Joi.object().keys({

        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })

}), ong_controller.create );


routes.get('/profile', celebrate({
    
    [Segments.HEADERS]: Joi.object({

        authorization: Joi.string().required(),

    }).unknown(),

}), profile_controller.index );
 

routes.get('/incidents', celebrate({
    
    [Segments.QUERY]: Joi.object().keys({

        page: Joi.number(),

    }),

}), incident_controller.index );

routes.post( '/incidents', incident_controller.create );

routes.delete('/incidents/:id', celebrate({
    
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),

}), incident_controller.delete );


module.exports = routes;