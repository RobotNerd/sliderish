import {Request} from 'express';

const MAX = 20;


/** Sanitize number of requested images. */
export function requestedCount(req: Request): number {
  let count: number = req.query.count ? parseInt(req.query.count as string) : 1;
  if (count > MAX) {
    count = MAX;
  }
  else if (count <= 0) {
    count = 1;
  }
  return count;
}
