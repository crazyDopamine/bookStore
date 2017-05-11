/**
 * Created by dongwei on 16/9/18.
 */
var Sequelize = require('sequelize');
var modelConfig = require('../model/modelConfig');
var sequelize = new Sequelize('rooms', 'postgres', 'dw2587758',{
    host:'localhost',
    port:'5432',
    dialect:'postgres',
    pool:{
        min:0,
        max:20,
        idle: 10000
    },
    sync:{force: true},
    version:1.0
});
var commonConfig = {
    timestamps:true,
    paranoid: true,
    underscored: true
}

var models = {};
var config;
for(var tableName in modelConfig){
    config = Object.assign({},modelConfig[tableName].config,commonConfig);
    models[tableName]=sequelize.define(
        modelConfig[tableName].tableName?modelConfig[tableName].tableName:tableName,
        modelConfig[tableName].field,
        config
    );
}

models.getDB=function(){
    return sequelize;
}
models.init=function(callback) {
    sequelize.sync({force: true}).then(function () {
        if (callback)callback();
    });
}
module.exports=models;