import { db } from "../db";

class User {
        constructor(
                private id: number,
                private userId: string,
                private language: string,
                private username: string,
                private createdAt: Date,
                private updatedAt: Date,
                private lastActive: Date
        ) {}
        
        public save(): void {
                db.query.usersTable.findFirst({
                        where: (u, {eq}) => eq(u.userId, "123"),
                })
        }

        public findOrCreate(): {

        }
}