import _ from "underscore";
import {Tag} from "../models/tag";

export class TagUtils {
  public static parseList(json: any):Tag[] {
    let tags:Tag[] = [];
    _.each(json, (tagJson) => tags.push(Tag.fromJson(tagJson)));
    return tags;
  }
}
