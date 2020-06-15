"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const productRoutes_1 = __importDefault(require("./routes/catalog/product/productRoutes"));
const settingRoutes_1 = __importDefault(require("./routes/setting/settingRoutes"));
const sendEmail_1 = __importDefault(require("./routes/sendEmail"));
/*
const whitelist = ['https://pay.doku.com', 'http://192.168.1.160:1234'];
const whitelistIp = ['147.139.133.123', '103.10.130.35', '103.10.129.9'];

const corsOptionsDelegate = function (req, callback) {
    var f = /f/gi;
    var t = /:/gi
    const ip = req.connection.remoteAddress.replace(f,'').replace(t,'');
    console.log(ip);
    console.log(whitelist.indexOf(req.header('Origin')));
    console.log(whitelistIp.indexOf(ip));
    
    let corsOptions;
    
    if (whitelist.indexOf(req.header('Origin')) !== -1 || whitelistIp.indexOf(ip) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
        callback(null, corsOptions); // callback expects two parameters: error and options
};
*/
var whitelist = ['http://vapehan.com', 'http://admin.vapehan.com', 'https://www.vapehan.com', 'https://admin.vapehan.com', 'https://api.vapehan.com', 'https://pay.doku.com/', 'https://vapehan.com', 'https://www.admin.vapehan.com'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }

    }
};
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 9000);
        this.app.use(morgan_1.default('dev'));

        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
		// this.app.use('/api/catalog/product', cors_1.default(), productRoutes_1.default);
        this.app.use('/api/setting', cors_1.default(), settingRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
