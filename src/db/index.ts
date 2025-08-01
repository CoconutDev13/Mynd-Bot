import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';

export default { db: drizzle(process.env.DATABASE_URL!) };
