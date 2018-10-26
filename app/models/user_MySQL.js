// app/models/user.js
// load the things we need
var mysql = require('mysql');
var bcrypt   = require('bcrypt-nodejs');
const { Model } = require('objection');
const Knex = require('knex');
const knex = Knex({
	client:'mysql',
	connection:'mysql://furever:furever1234@localhost:3306/APOD'
});
Model.knex(knex);
// define the schema for our user model
class user extends Model{
	
}
async function createSchema(UserName){
const hasTable = await knex.schema.hasTable('persons');
	if(!hasTable){
		return knex.schema.createTable('persons',(table)=>{
			table.string('password');
			table.string('user');
		});
	}
}
async function main(){
	const name = await 
}

// methods ======================
// generating a hash
user.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
user.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = user;
