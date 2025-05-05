import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplication, Logger } from '@nestjs/common';
import { ServerOptions } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export class SocketIoAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketIoAdapter.name);

  constructor(
    private app: INestApplication,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: 'http://localhost:5173',
        credentials: true,
      },
    });

    server.use((socket, next) => {
      const token = socket.handshake.auth?.token;

      if (!token) {
        this.logger.warn('Socket connection rejected: No token provided');
        return next(new Error('Authentication error'));
      }

      try {
        const payload = this.jwtService.verify(token, {
          secret: this.configService.get<string>('AT_SECRET'),
        });
        socket.user = payload;
        next();
      } catch (err) {
        this.logger.warn('Socket connection rejected: Invalid token');
        next(new Error('Authentication error'));
      }
    });

    return server;
  }
}
