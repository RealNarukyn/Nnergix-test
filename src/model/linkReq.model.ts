import { Schema, model } from "mongoose";
import { ILinkReq } from "../interfaces/links.interface";

const schema = new Schema<ILinkReq>(
  {
    url: { type: String, required: true },
    links: [{ text: String, href: String }],
  },
  { timestamps: true }
);

export const LinkReqModel = model<ILinkReq>("LinkReq", schema);
