import {Component, Input} from "@angular/core";
import {Platform, NavParams, AlertController, LoadingController} from "ionic-angular";
import {FormBuilder} from "@angular/forms";
import {TagsProvider} from "../../../providers/tags";
import _ from 'underscore';

@Component({
  selector:'tag-create-input',
  templateUrl: 'tag.create.input.html',
  providers: []
})
export class TagCreateInput{
  public tagsForm:any;
  @Input() protected tags: any;

  constructor(
    public platform: Platform,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private alertController:AlertController,
    private navParams: NavParams,
    private tagsService: TagsProvider
  ) {
    this.tagsForm = formBuilder.group({ tagName: ['']});
    console.log(this.tags)
  }

  add(control) {
    if (this.doesTagExist()) return;

    let loader = this.buildAndShowLoader();

    this.tagsService.create(this.tagsForm.tagName).subscribe(
      data => {
        loader.dismissAll();
        this.tags.push(data['tag']);
        this.tagsForm.reset();
      },
      err => {
        loader.dismissAll();
        this.alertController.create({title: "Error", message: err.message}).present();
      }
    );
  }

  private doesTagExist() {
    let tagName = this.tagsForm.tagName;
    let tags = _.filter(this.tags, function(tag) {
      return tag['name'].toLowerCase() == tagName.toLowerCase();
    });

    return tags.length > 0;
  }

  private buildAndShowLoader() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    return loader;
  }

}
