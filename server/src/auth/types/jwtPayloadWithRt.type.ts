/* eslint-disable prettier/prettier */
import { JwtPayload } from "./jwtPayload.type";


export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };