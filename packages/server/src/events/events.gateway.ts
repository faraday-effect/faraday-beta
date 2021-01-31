import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private server: Server;
  private static connectionCount = 0;

  constructor() {
    // setInterval(() => this.server.emit('now', new Date()), 2000);
  }

  handleConnection(client: Client, ...args): any {
    console.log('CONNECT', client.id);
    EventsGateway.connectionCount++;
  }

  handleDisconnect(client: Client): any {
    console.log('DISCONNECT', client.id);
    EventsGateway.connectionCount--;
  }

  @SubscribeMessage('log-in')
  async handleLogIn(@MessageBody() data: any): Promise<number> {
    console.log('LOGIN', data);
    return EventsGateway.connectionCount;
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({
        event: 'events',
        data: item,
      })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
