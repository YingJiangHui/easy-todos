#!/usr/bin/env node
const {add} =require('./function/add/add')
const {remove} = require('./function/remove/remove')
const clear = require('./function/clear/clear')
const show = require('./function/show/show')

module.exports = {add, remove, clear, show}


