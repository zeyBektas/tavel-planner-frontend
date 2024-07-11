import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlacesFacadeService } from '../../../façade/places-facade.service';
import { PlaceRequest } from '../../../models/request/place-request.model';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent {
  adminForm = new FormGroup({
    place_name: new FormControl(null, Validators.required),
    latitude: new FormControl(null, Validators.required),
    longitude: new FormControl(null, Validators.required),
    imageUrl: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    district: new FormControl(null, Validators.required),
    duration: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
    tag: new FormControl('', Validators.required),
    isVegan: new FormControl('', Validators.required),
    popularityRate: new FormControl(0),
  });

  successMessage: string | null = null;

  constructor(private placesFacade: PlacesFacadeService) {}

  ngOnInit(): void {}

  openPopup() {
    alert('Popup');
  }

  private modalService = inject(NgbModal);
  closeResult = '';

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result: any) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason: any) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  onSubmit() {
    if (this.adminForm.valid) {
      const formData = this.adminForm.value;
      console.log('Form data:', formData);
      const e: PlaceRequest = {
        place_name: formData.place_name!,
        latitude: formData.latitude!,
        longitude: formData.longitude!,
        imageUrl: formData.imageUrl!,
        country: formData.country!,
        city: formData.city!,
        district: formData.district!,
        duration: formData.duration!,
        price: formData.price!,
        type: formData.type!,
        tag: ['POPULAR'],
        popularityRate: formData.popularityRate!,
        isVegan: formData.isVegan == "true" ? true : false,
      };
      this.placesFacade.savePlace(e).then(() => {
        this.modalService.dismissAll();
        this.successMessage = 'Place successfully added!';
        this.adminForm.reset();
        setTimeout(() => {
          this.successMessage = null;
        }, 2000); // Hide the message after 2 seconds
      }).catch((error) => {
        console.error('Error saving place:', error);
        alert('An error occurred while saving the place.');
      });
    } else {
      alert('Please fill all the fields!');
    }
  }
}
