"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settingController_1 = __importDefault(require("./../../controllers/setting/settingController"));
const database_1 = __importDefault(require("../../database"));

class SettingRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/update/stock/product/ochinchi', settingController_1.default.upstpro);
	    this.router.get('/update/stock/product/gudang', settingController_1.default.upstgudang);
    }
}
const settingRoutes = new SettingRoutes();
exports.default = settingRoutes.router;
