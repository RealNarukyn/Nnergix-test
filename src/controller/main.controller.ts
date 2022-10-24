import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import cheerio from "cheerio";
import { Link } from "../types/types";
import { LinkReqModel } from "../model/linkReq.model";
import { DbController } from "./db.controller";

export default class MainController {
  static index = (req: Request, res: Response) => {
    res.status(200).send("Hello World!");
  };

  static link = async (req: Request, res: Response) => {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "Invalid url..." });
    }

    const pageResponse = await axios(url);
    const links: Link[] = getLinkects(pageResponse);

    const LinkReq = new LinkReqModel({ url, links });
    await LinkReq.save();

    res.status(200).json(links);
  };

  static clearCollections = async (req: Request, res: Response) => {
    await DbController.clearDB();
    res.status(200).json({ msg: "Collections cleared successfully ✨" });
  };
}

const getLinkects = (axiosResponse: AxiosResponse<any, any>): Link[] => {
  // load content to cheerio
  const $ = cheerio.load(axiosResponse.data);
  // this is a mass object, not an array
  const Linkects = $("a");

  const links: Link[] = [];
  Linkects.each((index, element) => {
    // Collect the "href" and "title" of each link and add them to an array
    links.push({
      text: $(element).text(), // get the text
      href: $(element).attr("href"), // get the href attribute
    });
  });

  return links.filter((e: Link) => e.href !== "" && e.href !== undefined);
};
