import { create, Message, Whatsapp } from 'venom-bot';
import config from 'config';
import { Database } from './storage'
import { Stage } from './stage';

const headerMessage = "BOT 🤖 -";

async function main(whats: Whatsapp) {
	await whats.onMessage(async (message) => {
        if(message.isGroupMsg) {
           return; 
        }

        if (String(message.body).toUpperCase() == "SAIR") {
            exit(whats, message);
            return;
        }
        
        try  {
            const stage = new Stage();
            const messageResponse = await stage.stage(message);

            if (messageResponse) {
                await whats.sendText(message.from, `${headerMessage} ${messageResponse}`);
            }
        } catch (error) {
            console.log(error);
            whats.close();
        }
    });
};

async function exit(whats:Whatsapp, message: Message) {
    await whats.sendText(
        message.from,
        `${headerMessage} Muito obrigado pela conversa! \nBate-papo encerrado!! ✨`
    );

    return message;
}

try {
    (async () => {
	    const venom = await create('sessionName');

        await main(venom);
    })();

} catch (error) {
    console.log(error);
}