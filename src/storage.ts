import { db } from "./database/connection";

export class Database {
    async getUserStage (from: string): Promise<Number> {
        try {
            const result = await db('user').where('phone', from);
            console.log(result);
            console.log('======================');
            if (!result[0]) {
                await db('user').insert({
                    phone: from,
                    stage: 1
                });

                return 1;
            }

            const stage = Number(result[0].stage);
            return stage;
        } catch (error) {
            throw error;
        }
    }

    async getStage (stage: number): Promise<String> {
        try {
            console.log(stage);
            const result = await db().select('message').from('stage').where('stage', stage);
            console.log(result[0].message);
            return String(result[0].message);
        } catch (error) {
            throw error;
        }
    }

    async updateStage (from: string, stage: Number) {
        try {
            const maxStage = await db('stage').orderBy('stage', 'desc').limit(1);
            if (maxStage[0].stage > stage) {
                stage = parseInt(stage.toString()) + 1;
                await db('user').update({stage: stage}).where('phone', from);

                return;
            }
        } catch (error) {
            throw error;
        }
    }
};