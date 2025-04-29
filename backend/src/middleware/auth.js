import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';

export const auth = asyncHandler((req, res, next) => {
  const authorization = req.headers['authorization'];
  if (!authorization || !authorization.startsWith(process.env.BEARERtOKEN)) {
    return next(new Error("Please login, you are not authorized"));
  }

  const token = authorization.split(" ")[1];
  console.log(token)
  try {
    const decoded = jwt.verify(token,process.env.SIGNTURE)
    req.user = decoded; 
    next();
  } catch (err) {
    return next(new Error("Invalid token"));
  }
});

