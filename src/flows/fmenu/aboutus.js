import { join } from "path";
import {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  utils,
  EVENTS,
} from "@builderbot/bot";
import { MemoryDB as Database } from "@builderbot/bot";
import { BaileysProvider as Provider } from "@builderbot/provider-baileys";
import { flowWelcome } from "../bienvenida.js";

const flowAboutus = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, { flowDynamic, endFlow, provider }) => {
    await provider.vendor.chatModify(
      {
          addChatLabel: {
              labelId: '7'
          }
      }, ctx.key.remoteJid
  )
    await flowDynamic(
       "🍕 ¡Hola! Nos alegra mucho que estés aquí. Somos PIRY'S PIZZA 🍕, una pizzería que no solo se dedica a preparar deliciosas pizzas, sino que también te ofrece una experiencia única y cercana.\n Desde el momento en que entras a nuestro local 🏪, te recibirás con una sonrisa 😊 y un ambiente cálido y acogedor. Para nosotros, cada cliente es especial, y nos esforzamos en atenderte de la mejor manera para que disfrutes cada momento con nosotros."
    );

    await flowDynamic(
      "📍 Te esperamos en nuestro local\nCra,56A No.10B Sur - 33 Guayabal - La Colinita (PARQUE DEL HG)"
    );

    await flowDynamic(
      "Nuestro horarios de atención son🕐:\n Lunes a Viernes de 4pm - 12am\n Sábados y Domingos de 2pm - 12am "
    );

    await flowDynamic(
      "Nos encanta lo que hacemos, y cada pizza 🍕 que sale de nuestro horno está hecha con los ingredientes más frescos 🍅 y con mucho cariño ❤. Queremos que cada bocado te haga sentir como en casa 🏠.\nNo dudes en preguntarnos cualquier cosa, ¡estamos aquí para ayudarte! 🤗 ¡Esperamos verte pronto y que disfrutes de una pizza espectacular 🍕👌"
    );

    await flowDynamic("1️⃣ Para regresar al menú\n2️⃣ Para finalizar la atención");
  }
).addAction({capture:true},
  async (ctx, { flowDynamic,gotoFlow, endFlow, provider }) => {
    let seleccion = ctx.body
   if(seleccion==="1"){
    return gotoFlow(flowWelcome)
   }else if(seleccion==="2"){
    return endFlow("Gracias por comunicarte con Pirys pizza🍕")
   }else{
    return endFlow("Selección no valida, comunicación finalizada")
   }
  }
);
export { flowAboutus };
