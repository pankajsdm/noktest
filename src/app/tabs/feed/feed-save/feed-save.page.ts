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
    this.getCategory();
  }

  getCategory(){
    this._services.getCategory().then(res => { 
      this.isLoading = false;  
      if(res['code']==200){
        this.getCat = res['data'];
        setTimeout( () => {
          this.uploadFeedForm.controls["category"].setValue(this.getCat[0].slug);
        }, 500)
      }else{
        this._services.presentToast(res['message'], 3000, 'middle');
      }
    })
    .catch(err => {
      this.isLoading = false;
      return this._services.presentToast(err.error.message, 3000, 'middle');
    });
  }

  updateSearchResults(event){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
    }
    this.isSearchListing = true;
    this.GoogleAutocomplete.getPlacePredictions({ input: event.target.value},
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          if(predictions)
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
        });
    });
  }
  
  selectSearchResult(item){
    this.searchInput = item.description
    this._services.getAddress(this.searchInput).then(res => {
      if(res && res['results']){
        const location = res['results'][0]['geometry']['location'];
        this.location = `${location.lat.toFixed(4)},${location.lng.toFixed(4)}`;
        console.log("result is",   this.location)
      }
    })
    this.isSearchListing = false;
  }

  openFileChoose():void {
    document.getElementById("upfile").click();
  }

  callFile($event){
    if($event && $event.target){
      this.uploadType = 'library';
      var reader = new FileReader();
      this.targetedFile = $event.target.files[0];
      this.fileType = this.isFileImage(this.targetedFile);
      if(this.fileType=='video'){
        this.previewVideo(this.targetedFile);
      }else{
        this.previewImage(this.targetedFile, reader);
      }
      this.isSelected = true;
    }
  }

  previewVideo(file){
    this.selectedFile = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file))
  }

  previewImage(file, reader){
    reader.readAsDataURL(file);
    reader.onload = (_event) => { 
      this.selectedFile = reader.result; 
    }
  }

  isFileImage(file) {
    return file && file['type'].split('/')[0];
  }


  uploadFeed(){
    

    if(this.uploadFeedForm.valid){
      this.isLoading = true;
      const formData = new FormData();
      const category = this.uploadFeedForm.value['category'].map(acc =>parseInt(acc));
      formData.append('id', this.currentUser.ID);
      formData.append('title', this.uploadFeedForm.value['title']);
      formData.append('description', this.uploadFeedForm.value['description']);
      formData.append('price', this.uploadFeedForm.value['price']);
      //formData.append('analytics', this.uploadFeedForm.value['analytics']);
      formData.append('category', JSON.stringify(category));
      formData.append('location', this.location);
      formData.append('file', this.targetedFile);
      formData.append('uploadType', this.uploadType);
      formData.append('cameraUploadData', this.cameraUploadData);
      if(this.fileType=='video'){
        formData.append('type','video');
      }else{
        formData.append('type','image');
      }
      this.saveData(formData);
    }
  }

  saveData(formData){
    this._services.createFeed(formData).then(res => { 
      this.isLoading = false;  
      if(res['code']==200){
        this.uploadFeedForm.reset();
        this._event.set('true', 'feed-updated');
        this.router.navigate(['/tabs/feed']);
      }
    })
    .catch(err => {
      this.isLoading = false;
      return this._services.presentToast(err.error.message, 3000, 'middle');
    });
  }

}
