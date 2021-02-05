import { Module } from '@nestjs/common';
import { SocketConnections } from './SocketConnections';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [EventsGateway, SocketConnections],
})
export class EventsModule {}
