import axios from "axios";
import cheerio from "cheerio";
import { Link } from "types/types";

export const regexURL =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export const getLinks = async (url: string): Promise<Link[]> => {
  // get the html data of the the requested url
  const pageResponse = await axios(url);

  // load content to cheerio
  const $ = cheerio.load(pageResponse.data);
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

export const filterURLs = (str: string): string[] => {
  // Split every url separated by ','
  const urlList = str.split(",");

  // Check if they're valid urls
  return urlList.filter((url) => regexURL.test(url));
};
