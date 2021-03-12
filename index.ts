#!/usr/bin/env node
export {}

const {add} =require('./function/add')
const {remove} = require('./function/remove')
const clear = require('./function/clear')
const show = require('./src/controller/show.ts')

module.exports = {add, remove, clear, show}


