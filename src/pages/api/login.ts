import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(400).json("400");
  }
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(401).json(401);
  if (user === "a" && pwd === "b") {
    const accessToken = jwt.sign({ user }, "12345", { expiresIn: 2 });
    const refreshToken = jwt.sign({ user }, "1234", { expiresIn: 20 });
    res.status(200).json({ accessToken, refreshToken });
  }
}
