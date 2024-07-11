import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
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
	});

  constructor() { }

  ngOnInit(): void {
    
  }

  openPopup() {
    alert("Popup");
  }

  private modalService = inject(NgbModal);
	closeResult = '';

	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result: any) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason: any) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
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
		console.log(this.adminForm)
		if (this.adminForm.valid) {
		  const formData = this.adminForm.value;
		  console.log('Form data:', formData);
		  // Perform your action here, e.g., send data to the server or save locally.
		} else {
		  alert("Please fill all the fields!")
		}
	  }
}
