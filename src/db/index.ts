import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { schema } from './schema';
import { relationships } from './relations';

const client = postgres(process.env.DATABASE_URL!, { max: 1 });

export const db = drizzle(client, { 
        schema: {
                ...schema,
                ...relationships
        }
});
