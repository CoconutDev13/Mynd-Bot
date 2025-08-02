import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgres://postgres:root@127.0.0.1:5432/mynd',
    user: 'postgres',
    password: '********',
    database: 'mynd'
  },
});
