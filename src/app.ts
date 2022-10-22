import express, { Request, Response } from "express";
import axios from "axios";
import cheerio from "cheerio";

import { LinkObj } from "./types/types";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

app.get("/link", async (req: Request, res: Response) => {
  const url = "https://coinmarketcap.com/";
  const pageResponse = await axios(url);

  // load content to cheerio
  const $ = cheerio.load(pageResponse.data);
  // this is a mass object, not an array
  const linkObjects = $("a");

  // Collect the "href" and "title" of each link and add them to an array
  const links: Array<LinkObj> = [];
  linkObjects.each((index, element) => {
    console.log(element);
    links.push({
      text: $(element).text(), // get the text
      href: $(element).attr("href"), // get the href attribute
    });
  });

  res.status(200).json(links);
});

export default app;
