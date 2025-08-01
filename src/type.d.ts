// src/types.d.ts

import { Collection, type ClientEvents } from 'discord.js';

declare module 'discord.js' {
  interface Client
  {
    commands: Collection<string, CommandModule>;
  }
}

type EventName = keyof ClientEvents;

export type EventModule = {
  name: EventName,
  once?: boolean;
  execute: (...args: any[]) => void | Promise<void>
}

export type CommandModule = {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => void | Promise<void>;
};