import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header("Authorization");
    const userAgent = request.header("User-Agent");
    const contentType = request.header("Content-Type");
    const body = request.body;
    console.log({ authHeader, userAgent, contentType, body });
    return authHeader === process.env.API_KEY;
  }
}