import { join } from 'path'
import { createBot, createProvider, createFlow, addKeyword, utils, EVENTS } from '@builderbot/bot'
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'


///////////////////////////////////////////////////////////////////////
import { flowInitPedido } from './smenu/iniciarpedido.js'
//////////////////////////////////////////////////////////////////////

const flowMenu = addKeyword(EVENTS.ACTION)
.addAction(
    async (ctx, { flowDynamic,endFlow,provider }) => {

     await flowDynamic("🍕 ¡Has ingresado al menú! 🍕\nAquí puedes ver nuestras deliciosas pizzas con sus precios y fotos")
     await provider.sendMedia(ctx.key.remoteJid, './src/assets/Menu1.jpg')
     await provider.sendMedia(ctx.key.remoteJid, './src/assets/Menu2.jpg')
     await provider.sendMedia(ctx.key.remoteJid, './src/assets/Menu3.jpg')
     await flowDynamic("¿List@ para hacer tu pedido? 😋 \n Indicanos *SI* o *NO*")
     
}).addAction({capture:true},
    async (ctx, { flowDynamic,endFlow,fallBack,gotoFlow,provider }) => {

        let seleccionado = ctx.body.toLowerCase().trim()
        await provider.vendor.chatModify(
            {
                addChatLabel: {
                    labelId: '7'
                }
            }, ctx.key.remoteJid
        )

        if(seleccionado ==="si"){
            return gotoFlow(flowInitPedido)
        }else if(seleccionado ==="no"){
            return endFlow("Ok, recuerda que cuando estés listo puedes escribirnos nuevamente🙌")
        }else{
            return fallBack("No es una opción valida🚫")
        }
})


export{flowMenu}
