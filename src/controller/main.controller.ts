import { Request, Response } from "express";
import { Link } from "../types/types";
import { LinkReqModel } from "../model/linkReq.model";
import { DbController } from "./db.controller";
import { getLinks } from "../utils";

export default class MainController {
  static index = (req: Request, res: Response) => {
    res.status(200).send("<marquee>Server Up!</marquee>");
  };

  static link = async (req: Request, res: Response) => {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "Invalid url..." });
    }

    const links: Link[] = await getLinks(url);

    const LinkReq = new LinkReqModel({ url, links });
    await LinkReq.save();

    res.status(200).json(links);
  };

  static linkCmd = async (url: string): Promise<number> => {
    if (!url) return 1;
    const links: Link[] = await getLinks(url);

    const LinkReq = new LinkReqModel({ url, links });
    await LinkReq.save();

    return 0;
  };

  static clearCollections = async (req: Request, res: Response) => {
    await DbController.clearDB();
    res.status(200).json({ msg: "Collections cleared successfully ✨" });
  };
}
