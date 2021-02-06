import { Client } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { Account } from '../account/entities';

export type SimpleAccount = Pick<
  Account,
  'id' | 'firstName' | 'lastName' | 'email'
>;

class ConnectionDetails {
  private readonly addDate: Date = null;
  private account: SimpleAccount = null;

  constructor(private clientId: string) {
    this.addDate = new Date();
  }

  setAccount(account: SimpleAccount) {
    this.account = account;
  }

  get isLoggedIn(): boolean {
    return this.account !== null;
  }

  toString() {
    const segments = [this.addDate.toISOString(), this.clientId];
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
    this.connectionMap = new Map<string, ConnectionDetails>();
  }

  addConnection(clientId: string) {
    if (this.connectionMap.has(clientId)) {
      throw new Error(`Client ${clientId} already in map`);
    }
    this.connectionMap.set(clientId, new ConnectionDetails(clientId));
  }

  private assertInMap(clientId: string): void {
    if (!this.connectionMap.has(clientId)) {
      throw new Error(`No client ${clientId} in map`);
    }
  }

  findConnection(clientId: string): ConnectionDetails {
    this.assertInMap(clientId);
    return this.connectionMap.get(clientId);
  }

  removeConnection(clientId: string) {
    this.assertInMap(clientId);
    this.connectionMap.delete(clientId);
  }

  get count() {
    return this.connectionMap.size;
  }

  allConnections() {
    return [...this.connectionMap.values()];
  }

  loggedInConnections() {
    return this.allConnections().filter((entry) => entry.isLoggedIn);
  }
}
