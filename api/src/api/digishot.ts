import axios from 'axios'
import * as https from 'https'

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
})

export const postAxiosDigishot = async (pRuta: string, pReq: any) => await axios.post(pRuta, pReq, { httpsAgent })
