import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AuthenticationTokenModel from "../models/tokens/authentication-token/authentication-token";
import { DataStoredInToken } from "../models/tokens/authentication-token/authentication-token-interface";

import AuthenticationTokenMissingException from "./exceptions/authentication-token-missing-exception";
import WrongAuthenticationTokenException from "./exceptions/wrong-authentication-token-exception";

const { JWT_SECRET } = process.env;

export type ReqUser = { user: DataStoredInToken };

function authMiddleware(
    request: Request & { user?: DataStoredInToken },
    response: Response,
    next: NextFunction
) {
    const bearerHeader = request.headers["authorization"];

    if (bearerHeader) {
        const bearer = bearerHeader.substring(7);
        try {
            verify(bearer, JWT_SECRET, async function (err, decoded) {
                if (err) {
                    next(new WrongAuthenticationTokenException());
                } else {
                    const isExist = await AuthenticationTokenModel.exists({ token: bearer });

                    if (isExist) {
                        request.user = decoded as DataStoredInToken;
                        next();
                        return;
                    }

                    next(new WrongAuthenticationTokenException());
                }
            });
        } catch (error) {
            next(new WrongAuthenticationTokenException());
        }
    } else {
        next(new AuthenticationTokenMissingException());
    }
}
export default authMiddleware;
