"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const BigchainDB = require("bigchaindb-driver");
const bip39 = require("bip39");
const base58 = require("bs58");
const nacl = require("tweetnacl-ts");
const API_PATH = 'https://test.bigchaindb.com/api/v1/';
let AppService = class AppService {
    constructor() {
        this.conn = new BigchainDB.Connection(API_PATH);
        this.seed = bip39.mnemonicToSeed('seedPhrase').slice(0, 32);
        debugger;
        const keyPair = nacl.sign_keyPair_fromSeed(this.seed);
        this.publicKey = base58.encode(Buffer.from(keyPair.publicKey));
        this.privateKey = base58.encode(Buffer.from(keyPair.secretKey.slice(0, 32)));
    }
    root() {
        console.log(this.publicKey + this.privateKey);
        return 'Hello World!';
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], AppService);
exports.AppService = AppService;
function Ed25519Keypair(seed) {
    debugger;
    const keyPair = nacl.sign_keyPair_fromSeed(seed);
    this.publicKey = base58.encode(Buffer.from(keyPair.publicKey));
    this.privateKey = base58.encode(Buffer.from(keyPair.secretKey.slice(0, 32)));
}
exports.default = Ed25519Keypair;
//# sourceMappingURL=app.service.js.map