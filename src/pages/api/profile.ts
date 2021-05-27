import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const tokenHeader = req.headers.authorization;
  const accessToken = tokenHeader?.split(" ")[1];
  if (!accessToken) {
    return res.status(201).json("go to login la");
  }
  jwt.verify(accessToken, "12345", (err, decoded) => {
    if (err) {
      return res.status(401).json("expired");
    }
    return res.status(200).json(decoded);
  });
}
