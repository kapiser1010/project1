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

/******************************************************************* */

const flowOrder = addKeyword(EVENTS.ACTION)
  .addAction(
    { capture: true },
    async (ctx, { flowDynamic, endFlow, state, provider }) => {
      const responseOrder = ctx.body.toUpperCase().trim();
      await state.update({ order: responseOrder });
      const savedName = await state.get("name");
      const savedOrder = await state.get("order");
      await flowDynamic(
        `🔍 Por favor confirma tu pedido, ${savedName}\nUsted ordenó: ${savedOrder}\n🔸 Dime *SI* para confirmar o *NO* si necesitas corregirlo.`
      );
    }
  )
  .addAction(
    { capture: true },
    async (
      ctx,
      { flowDynamic, endFlow, gotoFlow, state, fallBack, provider }
    ) => {
      let response = ctx.body.toLowerCase().trim();
      const number = ctx.from;

      if (response === "si") {
        return gotoFlow(flowpedidofin);
        //console.log(savedNumber);
      } else if (response === "no") {
        await flowDynamic(
          "Indicanos nuevamente tu orden, recuerda que sólo queda esta oportunidad para actualizar tu pedido en esta comunicación‼"
        );
        return gotoFlow(flowOrder)
      } else {
        return fallBack("No es una opción valida🚫");
      }
    }
  );

  export{flowOrder}
