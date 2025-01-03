"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCloudBSSQuery = executeCloudBSSQuery;
const odbc = require("odbc");
const dotenv = require("dotenv");
dotenv.config();
function executeCloudBSSQuery(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const connectionString = process.env.CLOUD_BSS_ODBC_CONNECTION_STRING;
        if (!connectionString) {
            throw new Error('Connection string is required');
        }
        let connection;
        try {
            connection = yield odbc.connect(connectionString);
            const result = yield connection.query(query);
            console.log("result", result);
            return result;
        }
        catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
        finally {
            if (connection) {
                yield connection.close();
            }
        }
    });
}
