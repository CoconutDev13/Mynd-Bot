// src/types.d.ts

import { Collection, type ClientEvents } from 'discord.js';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, any>;
  }
}

type EventName = keyof ClientEvents;

export type EventModule = {
  name: EventName,
  once?: boolean;
  execute: (...args: any[]) => void | Promise<void> 
}