import path from 'path';
import fs from 'fs';
import type { Client } from 'discord.js';
import type { EventModule } from '../type';

export async function loadEvents(client: Client, eventsPath: string) {
  const absolutePath = path.resolve(eventsPath);
  const files = fs
    .readdirSync(absolutePath)
    .filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of files) {
    const fullPath = path.join(absolutePath, file);
    const mod = await import(fullPath);
    const event: EventModule = mod.default || mod;

    if (!event?.name || typeof event.execute !== 'function') {
      console.warn(`⚠️ Το αρχείο "${file}" δεν περιέχει σωστό event export.`);
      continue;
    }

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }

    console.log(`✅ Event συνδέθηκε: ${event.name} (${file})`);
  }
}
