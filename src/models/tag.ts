import _ from "underscore";

export class Tag {
  public name: string;
  public _id: string;

  public constructor() {}

  public static fromJson(json: any): Tag {
    let tag: Tag = new Tag();
    let attributes = ['name', '_id'];

    _.forEach(attributes, (attribute) => {
      if (json[attribute]) {
        tag[attribute] = json[attribute];
      }
    });

    return tag;
  }
}
