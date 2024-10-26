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

/*********************************************************************** */

import { flowpedidofin } from "./pedidofin.js";
import {flowOrder} from "./orden.js"
/******************************************************************* */

const flowInitPedido = addKeyword(EVENTS.ACTION)
  .addAction(async (ctx, { flowDynamic, endFlow, state, provider }) => {
    await flowDynamic(
      "Para comenzar, ¿me regalas tu nombre completo, por favor? "
    );
  })
  .addAction({ capture: true }, async (ctx, { flowDynamic,gotoFlow,endFlow, state, provider }) => {
    const responseName = ctx.body.toUpperCase().trim();
    await state.update({ name: responseName });
    const savedName = await state.get('name');
    await provider.vendor.chatModify(
      {
        addChatLabel: {
          labelId: "2",
        },
      },
      ctx.key.remoteJid
    );
    
    await flowDynamic(
     `${savedName} , ✨ ¡Ahora indícanos los detalles de tu pedido! 🍕👇\nProducto: ¿Qué deseas?\nTamaño: 📏\nSabor: 🧀\n¿Te gustaría la promoción de la gaseosa? *(Aplica de lunes a viernes)*\nPizza personal: Incluye *Coca Cola 400 ml*\nA partir de la pizza mediana puedes elegir una *Econolitro* de Uva, Manzana, Colombiana o Pepsi. 🥤`
    ); 
    await flowDynamic("(RECUERDA ESCRIBIR TODO EN UN SÓLO PÁRRAFO)😉‼")
    return gotoFlow(flowOrder)
  })

export { flowInitPedido };
