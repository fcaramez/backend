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
exports.AuthService = void 0;
const auth_config_1 = require("./auth.config");
const common_1 = require("@nestjs/common");
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
let AuthService = class AuthService {
    constructor(authConfig) {
        this.authConfig = authConfig;
        this.userPool = new amazon_cognito_identity_js_1.CognitoUserPool({
            UserPoolId: this.authConfig.userPoolId,
            ClientId: this.authConfig.clientId,
        });
    }
    registerUser(registerRequest) {
        const { name, email, password } = registerRequest;
        return new Promise((resolve, reject) => {
            return this.userPool.signUp(name, password, [new amazon_cognito_identity_js_1.CognitoUserAttribute({ Name: "email", Value: email })], null, (err, result) => {
                if (!result) {
                    reject(err);
                }
                else {
                    resolve(result.user);
                }
            });
        });
    }
    authenticateUser(user) {
        const { name, password } = user;
        const authenticationDetails = new amazon_cognito_identity_js_1.AuthenticationDetails({
            Username: name,
            Password: password,
        });
        const userData = {
            Username: name,
            Pool: this.userPool,
        };
        const newUser = new amazon_cognito_identity_js_1.CognitoUser(userData);
        return new Promise((resolve, reject) => {
            return newUser.authenticateUser(authenticationDetails, {
                onSuccess: (result) => {
                    resolve(result);
                },
                onFailure: (err) => {
                    reject(err);
                },
            });
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_config_1.AuthConfig])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map