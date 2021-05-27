import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(400).json("400");
  }
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(403).json(403);
  jwt.verify(refreshToken, "1234", (err, user) => {
    if (err) {
      return res.status(401).json(401);
    }
    const accessToken = jwt.sign({ user: user.user }, "12345", {
      expiresIn: 10,
    });
    res.json({ accessToken: accessToken });
  });
}
