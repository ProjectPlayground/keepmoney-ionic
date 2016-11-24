import {Component, OnInit} from '@angular/core';

import {Platform, NavParams, AlertController, LoadingController, ItemSliding} from 'ionic-angular';
import {FormBuilder} from "@angular/forms";
import {TagsProvider} from "../../providers/tags";
import _ from 'underscore';

@Component({
  selector:'popover-tags',
  templateUrl: 'tags.html',
  providers: []
})
export class TagsPopover implements OnInit{
  public tagsForm:any;
  public tags:any;
  public editableTagId:any;
  public editableTagName:string;

  constructor(
    public platform: Platform,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private alertController:AlertController,
    private navParams: NavParams,
    private tagsService: TagsProvider
  ) {
    this.tagsForm = formBuilder.group({ tagName: ['']});
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.tags = this.navParams.data.tags;
      console.log(this.tags);
    }
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

  remove(tag) {
    let loader = this.buildAndShowLoader();

    this.tagsService.remove(tag['_id']).subscribe(
      data => {
        _.forEach(this.tags, () => this.tags.pop());
        _.forEach(data['collection'], (tag) => this.tags.push(tag));
        console.log(data);
        loader.dismissAll();
      },
      err => {
        loader.dismissAll();
        this.alertController.create({title: "Error", message: err.message}).present();
      }
    );
  }

  editMode(tag, slidingItem: ItemSliding) {
    this.editableTagId = tag._id;
    this.editableTagName = tag.name;
    slidingItem.close();
  }

  isInEditMode(tagId) {
    return this.editableTagId == tagId;
  }

  updateTag() {
    if (_.isEmpty(this.editableTagName)) return;
    let loader = this.buildAndShowLoader();

    var tag = _.where(this.tags, {_id: this.editableTagId})[0];

    this.tagsService.update(this.editableTagId, this.editableTagName).subscribe(
      data => {
        loader.dismissAll();
        tag['name'] = this.editableTagName;
        this.editableTagId = null;
        this.editableTagName = null;
      },
      err => {
        loader.dismissAll();
        this.alertController.create({title: "Error", message: err.message}).present();
      }
    );
  }

  private buildAndShowLoader() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    return loader;
  }

  private doesTagExist() {
    let tagName = this.tagsForm.tagName;
    let tags = _.filter(this.tags, function(tag) {
      return tag['name'].toLowerCase() == tagName.toLowerCase();
    });

    return tags.length > 0;
  }
}
