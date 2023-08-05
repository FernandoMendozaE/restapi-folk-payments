import mercadopage from 'mercadopago'
import ngrok from 'ngrok'

import { HOST, MERCADOPAGO_API_KEY, PORT } from '../config.js'
import config from '../util/config.js'

const getNgrokUrl = async () => {
  try {
    return await ngrok.connect(PORT) // Reemplaza 3000 con el puerto en el que tu servidor Node.js escucha
  } catch (error) {
    console.error('Error al iniciar ngrok:', error)
    return null
  }
}

export const createOrder = async (req, res) => {
  mercadopage.configure({
    access_token: MERCADOPAGO_API_KEY
  })

  try {
    // Obtiene la URL pública generada por ngrok
    const ngrokUrl = await getNgrokUrl()

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
      notification_url: `${ngrokUrl}/webhook`,
      back_urls: {
        success: `${HOST}/success`
        // pending: "https://0911-186-121-234-42.ngrok.io/pending",
        // failure: "https://0911-186-121-234-42.ngrok.io/failure",
      }
    })

    console.log(result)

    // res.json({ message: "Payment creted" });
    res.json(result.body)
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' })
  }
}

export const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query
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
