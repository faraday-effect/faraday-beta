import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { SimpleAccount, SocketConnections } from './SocketConnections';
import { ChooseOneContent, WidgetTypes } from 'shared';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private server: Server;

  constructor(private socketConnections: SocketConnections) {
    // setInterval(() => this.server.emit('now', new Date()), 2000);
  }

  dumpConnections(msge: string, client: Client) {
    console.log(`${msge} ${client.id} - ${this.socketConnections.count}`);
    if (this.socketConnections.count > 0) {
      console.log(this.socketConnections.allConnections().join('\n'));
    }
    this.server.emit(
      'currentConnections',
      this.socketConnections.allConnections(),
    );
  }

  handleConnection(client: Client, ...args): void {
    this.socketConnections.addConnection(client.id);
    this.dumpConnections('CONNECT', client);
  }

  handleDisconnect(client: Client): void {
    this.socketConnections.removeConnection(client.id);
    this.dumpConnections('DISCONNECT', client);
  }

  @SubscribeMessage('log-in')
  async handleLogIn(
    @MessageBody() data: SimpleAccount,
    @ConnectedSocket() client: Client,
  ) {
    this.socketConnections.findConnection(client.id).setAccount(data);
    this.dumpConnections('LOG IN', client);
  }

  sendChooseOne() {
    const chooseOneContent: ChooseOneContent = {
      type: WidgetTypes.ChooseOne,
      prompt: 'What is your favorite color?',
      choices: [
        { key: 'r', value: 'Red' },
        { key: 'g', value: 'Green' },
        { key: 'b', value: 'Blue' },
      ],
    };
    this.server.emit('poll', chooseOneContent);
  }
}
