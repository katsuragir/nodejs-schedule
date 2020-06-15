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

var whitelist = ['http://localhost/katsuragir'];
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
