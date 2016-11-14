import {Component, OnInit} from '@angular/core';

import {Platform, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {FormBuilder} from "@angular/forms";
import {TagsProvider} from "../../providers/tags";
@Component({
  selector:'popover-tags',
  templateUrl: 'tags.html',
  providers: []
})
export class TagsPopover implements OnInit{
  public tagsForm:any;
  public tags:any;
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

  add() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();


    this.tagsService.create(this.tagsForm.tagName).subscribe(
      data => {
        loader.dismissAll();

        this.tags.push(data['tag']);
        this.tagsForm.reset();
      },
      err => {
        loader.dismissAll();
        this.alertController.create({
          title: "Error",
          message: err.message
        }).present();
      }
    );
  }
}
