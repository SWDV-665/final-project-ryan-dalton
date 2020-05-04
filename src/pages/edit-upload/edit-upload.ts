import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavParams, NavController } from 'ionic-angular';
import { JournalEntryProvider } from '../../providers/journal-entry/journal-entry';
//import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Modal, ModalController} from 'ionic-angular';
/**
 * Generated class for the EditUploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-upload',
  templateUrl: 'edit-upload.html',
})
export class EditUploadPage{
  public title: String;
  public itemDate: String;
  public picture: String;
  public blurb: String;
  public id: String;

  constructor(
    public modalCtrl: ModalController, 
    //private androidPermissions: AndroidPermissions,
    public camera: Camera,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public dataService: JournalEntryProvider,
    public navParams: NavParams,
    public navCtrl: NavController){
      this.title = this.navParams.get('title');
      this.itemDate = this.navParams.get('itemDate');
      this.picture = this.navParams.get('picture');
      this.blurb = this.navParams.get('blurb');
      this.id = this.navParams.get('_id');
      console.log("ID RETRIEVED IS", this.id);
  }

  getImage(){
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      targetWidth:200,
      targetHeight:200
    }
    //By putting getAndroid permissions in here - this shouldn't trigger on webview w/ the Cordova error, we'll see
    //this.getAndroidPermissions()
    this.camera.getPicture(options).then((imageData) => {
  
      //this.imagesource = 'data:image/jpeg;base64,' + imageData;
      this.picture = 'data:image/jpeg;base64,' + imageData;
    
    }, (err)=> {
      alert("Please run App in Android Phone to enable Cordova/Camera Functionality")
      console.log("Camera functionality not available outside of Android App, error here:", err);
      
    });
  }

  presentModal() {
    const myModal: Modal = this.modalCtrl.create('ModalPage');
    myModal.present();
    
    myModal.onDidDismiss((textEntry) => {
      console.log("brought data", textEntry, "out of ModalPage");
      
      this.blurb = textEntry;
    })

  }



  async buttonClickedEdit(id){  
    
    let data = {
      "title": this.title,
      "itemDate": this.itemDate,
      //if no picture is selected, use the generic photo image shown w/ imagesource path
      "picture": this.picture,
      "blurb": this.blurb,
    }
    console.log("Captured data:", this.title, this.itemDate, this.picture, this.blurb);
    await this.dataService.editEntry(data, this.id);
    this.presentLoading();
    await new Promise(resolve => setTimeout(resolve, 2000)); //wait 2 seconds
    this.toast("Uploaded Edits to Journal Entry!", this.title);
    this.navCtrl.pop();
    
    }

    presentLoading() {
      const loader = this.loadingCtrl.create({
        content: "Uploading edits...",
        duration: 2000
      });
      loader.present();
    }

    toast(updateString: string, params?: any){
      console.log("Notified User -", updateString, "-", params);
      const toast = this.toastCtrl.create({
        message: updateString + params,
        duration: 2000
      });
      toast.present();
  
    }
  
}
