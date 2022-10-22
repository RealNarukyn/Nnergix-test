import express, { Request, Response } from "express";
import axios from "axios";
import cheerio from "cheerio";

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
  const links: Array<{ text: string; href: string | undefined }> = [];
  linkObjects.each((index, element) => {
    links.push({
      text: $(element).text(), // get the text
      href: $(element).attr("href"), // get the href attribute
    });
  });

  console.info(links);

  res.status(200).send("Scrapping Scrappus Done!");
});

export default app;
