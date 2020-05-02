import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CardViewPage } from '../pages/card-view/card-view';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { JournalEntryProvider } from '../providers/journal-entry/journal-entry';
import { ImageUploadServiceProvider } from '../providers/image-upload-service/image-upload-service'
import { CameraServiceProvider } from '../providers/camera-service/camera-service';

import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';




@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CardViewPage
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CardViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JournalEntryProvider,
    ImageUploadServiceProvider,
    CameraServiceProvider,
    Camera
    
  ]
})
export class AppModule {}
