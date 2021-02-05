import { Client } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { Account } from '../account/entities';

export type SimpleAccount = Pick<
  Account,
  'id' | 'firstName' | 'lastName' | 'email'
>;

class Connection {
  private readonly addDate: Date = null;
  private account: SimpleAccount = null;

  constructor(private client: Client) {
    this.addDate = new Date();
  }

  setAccount(account: SimpleAccount) {
    this.account = account;
  }

  get isLoggedIn(): boolean {
    return this.account !== null;
  }

  toString() {
    const segments = [this.addDate.toISOString(), this.client.id];
    if (this.isLoggedIn) {
      segments.push(
        this.account.firstName,
        this.account.lastName,
        this.account.email,
      );
    } else {
      segments.push('Not logged in');
    }
    return segments.join(' | ');
  }
}

@Injectable()
export class SocketConnections {
  private readonly connectionMap;

  constructor() {
    this.connectionMap = new Map<string, Connection>();
  }

  addConnection(client: Client) {
    if (this.connectionMap.has(client.id)) {
      throw new Error(`Client ${client.id} already in map`);
    }
    this.connectionMap.set(client.id, new Connection(client));
  }

  private assertInMap(client: Client): void {
    if (!this.connectionMap.has(client.id)) {
      throw new Error(`No client ${client.id} in map`);
    }
  }

  findConnection(client: Client): Connection {
    this.assertInMap(client);
    return this.connectionMap.get(client.id);
  }

  removeConnection(client: Client) {
    this.assertInMap(client);
    this.connectionMap.delete(client.id);
  }

  get count() {
    return this.connectionMap.size;
  }

  allConnections() {
    return Array.from(this.connectionMap, ([_k, v]) => v);
  }

  loggedInConnections() {
    return this.allConnections().filter((entry) => entry.isLoggedIn);
  }
}
