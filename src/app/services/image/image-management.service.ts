import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { PermissionError } from './permission-error';
import { RealFileLoaderService } from './real-file-loader.service';

@Injectable()
export class ImageManagementService {
  private readonly baseUrl = 'http://localhost:3000';
  private cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(
    private httpClient: HttpClient,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private realFileLoaderService: RealFileLoaderService) {}

  async uploadFromImagePicker(): Promise<any[]> {
    const hasPermission = await this.imagePicker.hasReadPermission();
    if (!hasPermission) {
      throw new PermissionError(`You don't have permission to use the image picker yet.`);
    }
    const imagePaths: string[] = await this.imagePicker.getPictures({});
    const imageFiles = await this.realFileLoaderService.getMultipleFiles(imagePaths);
    const formData = new FormData();
    imageFiles.forEach(file => formData.append('photos', file, file.name));
    return this.uploadImages(formData);
  }

  async uploadFromCamera() {
    const imagePath: string = await this.camera.getPicture(this.cameraOptions);
    const imageFile = await this.realFileLoaderService.getSingleFile(imagePath);
    const formData = new FormData();
    formData.append('photos', imageFile, imageFile.name);
    const result = await this.uploadImages(formData);
    await this.camera.cleanup();
    return result;
  }

  uploadImages(formData: FormData): Promise<any[]> {
    return this.httpClient.post<any[]>(`${this.baseUrl}/upload-photos`, formData).toPromise();
  }

  async listImagesOnServer(): Promise<string[]> {
    const imageNames = await this.httpClient.get<string[]>(`${this.baseUrl}/list-images`).toPromise();
    return imageNames.map(imageName => `${this.baseUrl}/images/${imageName}`);
  }
}
