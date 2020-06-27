import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Platform, ActionSheetController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/common/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
//import { ElementRef } from '@angular/core';
import { ObsService } from './../../../services/observer/obs.service';
import { environment } from './../../../../environments/environment';
declare var google: any;


@Component({
  selector: 'app-feed-save',
  templateUrl: './feed-save.page.html',
  styleUrls: ['./feed-save.page.scss'],
})
export class FeedSavePage implements OnInit {




  currentUser: any;
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  autocomplete = { input: '' };
  autocompleteItems: any = [];

  isLoading: boolean = true;
  uploadFeedForm: FormGroup;
  MAX_FILE_SIZE = 5 * 1024 * 1024;
  ALLOWED_MIME_TYPE = "video/mp4";

  isSelected: boolean = false;
  selectedFile: any;
  targetedFile: any;
  fileType: String;
  getCat: any;
  isSubmitShow: boolean = true;

  cameraUploadData: any = {}
  uploadType: string = 'library';
  searchInput: any;
  isSearchListing: boolean = false;
  location: string;

 
  private chhooseFile: any;

  constructor(

    private _services: CommonService,
    formBuilder: FormBuilder,
    private zone: NgZone,
    private file: File,
    public actionSheetCtrl: ActionSheetController,
    private platform: Platform,
    private router: Router,
    private _event: ObsService,
    public _sanitizer: DomSanitizer 
  ) {
    
    this.uploadFeedForm = formBuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      price: ["", [Validators.required]],
      category: ["", [Validators.required]],
    });
  }


  ngOnInit() {
    this.currentUser = this._services.getUser();
    
  }

  uploadFeed(){

  }

  chooserMedia(){

  }

}
