const express = require( 'express' );

const ong_controller = require( './controllers/ong-controller' );

const incident_controller = require( './controllers/incident-controller' );

const profile_controller = require( './controllers/profile-controller' );

const session_controller = require( './controllers/session-controller' );

const routes = express.Router();


routes.post( '/sessions', session_controller.create );


routes.get( '/ongs', ong_controller.index );

routes.post( '/ongs', ong_controller.create );


routes.get( '/profile', profile_controller.index );


routes.get( '/incidents', incident_controller.index );

routes.post( '/incidents', incident_controller.create );

routes.delete( '/incidents/:id', incident_controller.delete );


module.exports = routes;