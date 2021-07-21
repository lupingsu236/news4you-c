import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam'
import { FormGroup } from '@angular/forms';

@Injectable() 
export class PostService {
    private image = new BehaviorSubject(null);
    currentImage = this.image.asObservable(); 
    private formData: FormGroup;

    constructor() {} 

    updateImage(newImage: WebcamImage) {
        this.image.next(newImage);
    }

    updateFormData(formData: FormGroup) {
        this.formData = formData;
    }

    getFormData() {
        return this.formData;
    }

    clearPost() {
        this.image.next(null);
        if(this.formData) {
            this.formData.reset();
        }
    }
}