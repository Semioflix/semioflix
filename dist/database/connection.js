"use strict";Object.defineProperty(exports, "__esModule", {value: true});require('dotenv/config');
var _supabasejs = require('@supabase/supabase-js');

 const connection = _supabasejs.createClient.call(void 0, String(process.env.API_URL), String(process.env.API_SECRET)); exports.connection = connection;