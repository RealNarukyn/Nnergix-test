import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { LinkObj } from "../types/types";
import cheerio from "cheerio";

export default class MainController {
  static index = (req: Request, res: Response) => {
    res.status(200).send("Hello World!");
  };

  static link = async (req: Request, res: Response) => {
    const url = "https://coinmarketcap.com/";
    const pageResponse = await axios(url);

    const links: LinkObj[] = getLinkObjects(pageResponse);

    res.status(200).json(links);
  };
}

const getLinkObjects = (axiosResponse: AxiosResponse<any, any>): LinkObj[] => {
  // load content to cheerio
  const $ = cheerio.load(axiosResponse.data);
  // this is a mass object, not an array
  const linkObjects = $("a");

  const links: LinkObj[] = [];
  linkObjects.each((index, element) => {
    // Collect the "href" and "title" of each link and add them to an array
    links.push({
      text: $(element).text(), // get the text
      href: $(element).attr("href"), // get the href attribute
    });
  });

  return links.filter((e: LinkObj) => e.href !== "" && e.href !== undefined);
};
