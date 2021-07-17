import { Message } from "venom-bot";
import { Database } from "./storage";

const headerMessage = "BOT 🤖 -";

export class Stage {
    async stage(message: Message) {
        const database = new Database;
        const currentStage = await database.getUserStage(message.from);
        console.log(message.body);
        console.log('stage = '+currentStage);
        switch (currentStage) {
            case 1:
                
            break;
            
            case 2:
                console.log(message.body.trim().replace(/^[1]*$/, ''));
                if (!(message.body.trim().toUpperCase().replace(/^[A-Z]*$/, ''))) {
                    return `${headerMessage} É aceito somento *Número*!`;
                }

                if (message.body.trim().length > 1) {
                    return `${headerMessage} \nÉ necessário digitar somente o *Número*!`;
                }
            break;
        
            default:
            break;
        }
        await database.updateStage(message.from, currentStage);

        const result = String(await database.getStage(Number(currentStage))); 
        
        return `${result}`;
    }
}