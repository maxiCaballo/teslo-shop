import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.url === '/api/search')
    res
      .status(400)
      .json({
        message: 'Endpoint does not exist, you must specify a search criteria',
      });
}
