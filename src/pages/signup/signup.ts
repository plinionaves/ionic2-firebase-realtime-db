import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AngularFire, FirebaseAuthState } from 'angularfire2';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  user: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private af: AngularFire, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.user = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();
    this.af.auth.createUser(this.user.value)
      .then((authState: FirebaseAuthState) => {
        console.log(authState);
        this.navCtrl.setRoot(HomePage);
      }).catch((error: Error) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error.message);
      });
  }

  private showLoading(): Loading {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
