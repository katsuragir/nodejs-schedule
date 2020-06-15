"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const local = __importDefault(require("../../database"));
var schedule = require('node-schedule');
var dateFormat = require('dateformat');
var rule = new schedule.RecurrenceRule();
var nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
class SettingController {
    upstpro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
			
			rule.hour = 1;
			
            schedule.scheduleJob('0 * * * * *', function(){
                function main() {
                    return __awaiter(this, void 0, void 0, function* () {
                        require('dns').resolve('www.google.com', function(err) {
                            if (err) {
                               console.log("No connection");
                            } else {
                                return __awaiter(this, void 0, void 0, function* () {
                                    const olprod = yield database_1.default.query('SELECT barcode FROM hm_product');
                                    let fill = [];
                                    olprod.forEach(barcode => {
                                        fill.push(barcode.barcode);
                                    });
                                    console.log(fill);
                                    const prod = yield local.local.query('SELECT barcode, productname as name, 1 as id_category, 1 as id_brand, "" as summary, "" as description, qty as stock, price, color, if (status = "Aktif", 1, 0) as status, "Regular" as kondisi, nic, weight, 1 as home, replace(lower(productname), " ", "-") as slug_url FROM masterproduct WHERE barcode NOT IN (?)', [fill]);
            
                                    if (prod.length > 0) {
                                        
                                        for (let i = 0; i < 1; i++) {
                                            console.log(`Upload Online ${prod[i].barcode} Success | ${new Date()}`);
                                            const data = {
                                                barcode: prod[i].barcode,
                                                name: prod[i].name,
                                                id_category: 1,
                                                id_brand: 1,
                                                stock: prod[i].stock,
                                                price: prod[i].price,
                                                color: prod[i].color,
                                                status: prod[i].status,
                                                kondisi: "Regular",
                                                nic: prod[i].nic,
                                                weight: prod[i].weight,
                                                home: 1
                                            };
                                            yield database_1.default.query('INSERT INTO hm_product SET ?', [prod[i]]);
                                        }
                                    }
                                    console.log(`Run Update Stock Web | ${new Date()}`);
                                });
                            }
                        });
                    });
                }
                main();
            });

            res.json({text : 'Web ok'});
        });
    }
    upstgudang(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
			
            rule.second = 1;
            
            schedule.scheduleJob('0 * * * * *', function(){
                function main() {
                    return __awaiter(this, void 0, void 0, function* () {
						require('dns').resolve('www.google.com', function(err) {
                            if (err) {
                               console.log("No connection");
                            } else {
                                return __awaiter(this, void 0, void 0, function* () {
                                    const offprod = yield local.retailht.query('SELECT barcode FROM hm_product');
                                    let fill = [];
                                    offprod.forEach(barcode => {
                                        fill.push(barcode.barcode);
                                    });
                                    console.log(fill);
                                    const prod = yield database_1.default.query('SELECT barcode, name, id_category, id_brand, summary, description, stock, price, color, status, kondisi, nic, weight, home, slug_url FROM hm_product WHERE barcode NOT IN (?)', [fill]);
            
                                    if (prod.length > 0) {
                                        for (let i = 0; i < 1; i++) {
                                            console.log(`Upload Oflline ${prod[i].barcode} Success | ${new Date()}`);
                                            yield local.retailht.query('INSERT INTO hm_product SET ?', [prod[i]]);
                                        }
                                    }
                                    console.log(`Run Update Stock Web | ${new Date()}`);
                                });
                            }
                        });
                    });
                }
                main();
            });

            res.json({text : 'Gudang Ok'});
        });
    }
}
const settingcontroller = new SettingController();
exports.default = settingcontroller;
