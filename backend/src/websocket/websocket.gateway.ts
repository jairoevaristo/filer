import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { env } from 'src/constants/env';
import { NotificationRepository } from 'src/notification/repositories/notification.repository';
import { UserRepository } from 'src/user/repositories/user.repository';
import { getCookieToken } from 'src/utils/get-cookie-token';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
    credentials: true,
  },
})
@Injectable()
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(WebsocketGateway.name);

  constructor(
    private notificationRepository: NotificationRepository,
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.log('Initialized websocket');
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.cookie;
    const access_token = getCookieToken(token, 'access_token');

    if (!access_token) return;

    const payload = await this.jwtService.verifyAsync(access_token, {
      secret: env.JWT_SECRET,
    });

    const userId = payload.sub;

    if (client.id) {
      this.userRepository.updateSocketId(userId, client.id);
    }

    this.logger.log(`Client id: ${client.id} connected`);
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  async sendMessage(userId: string, message: any) {
    const user = await this.userRepository.findById(userId);

    if (user?.socketId) {
      this.server.to(user.socketId).emit('send-notification', message);
    }
  }

  @SubscribeMessage('view-notification')
  async handleMessage(@MessageBody() data: { notificationId: string }) {
    await this.notificationRepository.markNotificationAsView(
      data.notificationId,
    );
  }
}
