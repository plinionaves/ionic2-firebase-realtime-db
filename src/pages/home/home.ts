import { Component, OnInit } from '@angular/core';

import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  songs: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public af: AngularFire) {}

  ngOnInit(): void {
    this.songs = this.af.database.list('/songs');
  }

  addSong(): void {
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Enter a name for this new song you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.songs.push({
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(songId, songTitle): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Song',
          role: 'destructive',
          handler: () => {
            this.removeSong(songId);
          }
        },{
          text: 'Update title',
          handler: () => {
            this.updateSong(songId, songTitle);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeSong(songId: string): void {
    this.songs.remove(songId);
  }

  updateSong(songId, songTitle): void {
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Update the name for this song",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: songTitle
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.songs.update(songId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

}