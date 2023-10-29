import { NextApiRequest, NextApiResponse } from 'next'
import { equipments } from "./equipments"

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  if (_req.method === 'GET') {
    return res.status(200).json(equipments);
  } else {
    return res.status(405).end();
  }
}

export default handler
