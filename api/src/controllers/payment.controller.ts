import mercadopage from 'mercadopago'
import ngrok from 'ngrok'

import config from '../util/config'
import { Request, Response } from 'express'

class Ngrok {
  private ngrok: any // Variable privada para almacenar la información generada

  // Función que se ejecutará la primera vez y almacenará la información
  private async cargarNgrok() {
    // Supongamos que esta es la función que quieres ejecutar y guardar la información
    this.ngrok = await getNgrokUrl() // Obtener la información de algún lugar
  }

  // Método público asincrónico para obtener la información almacenada
  public async obtenerNgrok(): Promise<any> {
    if (!this.ngrok) {
      // Si la información aún no ha sido cargada, llamamos a la función
      await this.cargarNgrok()
    }

    return this.ngrok
  }
}

const getNgrokUrl = async () => {
  try {
    const resUrl = await ngrok.connect(+config.PORT) // Reemplaza 3000 con el puerto en el que tu servidor Node.js escucha
    return resUrl
  } catch (error) {
    console.error('Error al iniciar ngrok:', error)
    return null
  }
}
const urlNgrok = new Ngrok()
// Obtiene la URL pública generada por ngrok

export const createOrder = async (req: Request<unknown, unknown, unknown, unknown>, res: Response) => {
  mercadopage.configure({
    access_token: config.MERCADOPAGO_API_KEY
  })

  try {
    const ngrokUrl = await urlNgrok.obtenerNgrok()
    if (!ngrokUrl) {
      // Si no se pudo obtener la URL de ngrok, devuelve un error
      return res.status(500).json({ message: 'Error al iniciar ngrok' })
    }

    const result = await mercadopage.preferences.create({
      items: [
        {
          title: 'Laptop',
          unit_price: 500,
          currency_id: 'PEN',
          quantity: 1
        }
      ],
      // notification_url: `${HOST}/webhook`,
      notification_url: `${ngrokUrl}/api/payments/webhook`,
      back_urls: {
        success: `${config.HOST}/api/payments/success`
        // pending: "https://0911-186-121-234-42.ngrok.io/pending",
        // failure: "https://0911-186-121-234-42.ngrok.io/failure",
      }
    })

    // res.json({ message: "Payment creted" });
    res.json(result.body)
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' })
  }
}

export const receiveWebhook = async (req: Request<unknown, unknown, unknown, unknown>, res: Response) => {
  try {
    const payment = req.query as any
    console.log(payment)
    if (payment.type === 'payment') {
      const data = await mercadopage.payment.findById(payment['data.id'])
      console.log(data)
    }

    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Something goes wrong' })
  }
}
