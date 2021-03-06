import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CardViewPage } from '../pages/card-view/card-view';
import { EditUploadPage } from '../pages/edit-upload/edit-upload';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { JournalEntryProvider } from '../providers/journal-entry/journal-entry';
import { ImageUploadServiceProvider } from '../providers/image-upload-service/image-upload-service'
import { CameraServiceProvider } from '../providers/camera-service/camera-service';

import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
//import { DomSanitizer } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ItemSliding } from 'ionic-angular';
import { InputProviderServiceProvider } from '../providers/input-provider-service/input-provider-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CardViewPage,
    EditUploadPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CardViewPage,
    EditUploadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JournalEntryProvider,
    ImageUploadServiceProvider,
    CameraServiceProvider,
    Camera,
    File,
    WebView,
    AndroidPermissions,
    ItemSliding,
    InputProviderServiceProvider
    
  ]
})
export class AppModule {}
