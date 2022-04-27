import { Request, Response } from 'express';

function errorMiddleware(error: Error, req: Request, res: Response) {
  // 터미널에 노란색으로 출력됨.
  console.log('\x1b[33m%s\x1b[0m', error.stack);
  res.status(400).send(error.message);
}

export { errorMiddleware };
