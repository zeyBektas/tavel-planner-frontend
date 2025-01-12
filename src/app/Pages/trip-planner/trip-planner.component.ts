import { CommonModule, JsonPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';

import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PlacesFacadeService } from '../../../façade/places-facade.service';

@Component({
  selector: 'app-trip-planner',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    NgbModule,
    NgClass,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  templateUrl: './trip-planner.component.html',
  styleUrl: './trip-planner.component.scss',
})
export class TripPlannerComponent {
  getData: any;

  tripPlannerForm = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    activities: new FormArray([], Validators.required),
    numPeople: new FormControl(1, Validators.required),
    startDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null, Validators.required),
    people: new FormArray([
      new FormGroup({

        name: new FormControl(null, Validators.required),
        surname: new FormControl(null, Validators.required),
        gender: new FormControl('', Validators.required),
        email: new FormControl(null, Validators.required),
      })

    ]),
  });

  today = new Date();
  day = String(this.today.getDate()).padStart(2, '0');
  month = String(this.today.getMonth() + 1).padStart(2, '0');
  year = this.today.getFullYear();
  minDate = `${this.year}-${this.month}-${this.day}`;
  endDateMin!: string;
  endDateMax!: string;

  onStartDateChange() {
    const startDate = this.tripPlannerForm.get('startDate')!.value;
    if (startDate) {
      this.endDateMin = startDate;
      const startDateObj = new Date(startDate);
      const endDateMaxObj = new Date(startDateObj);
      endDateMaxObj.setDate(startDateObj.getDate() + 15);
      this.endDateMax = endDateMaxObj.toISOString().split('T')[0];
    } else {
      this.endDateMin = this.minDate;
      this.endDateMax = '';
    }
  }

  people = this.tripPlannerForm.get('people') as FormArray;

  constructor(private placesFacade: PlacesFacadeService) {}

  ngOnInit() {
    this.tripPlannerForm.get('numPeople')?.valueChanges.subscribe((value) => {
      this.adjustPeopleArray(value!);
      this.getData = value;
    });
  }

  adjustPeopleArray(numPeople: number) {
    const peopleArray = this.people;
    const currentPeople = peopleArray.length;

    if (currentPeople < numPeople) {
      for (let i = currentPeople; i < numPeople; i++) {
        peopleArray.push(
          new FormGroup({
            name: new FormControl(),
            surname: new FormControl(),
            gender: new FormControl(),
            email: new FormControl(),
          })
        );
      }
    } else {
      for (let i = currentPeople; i > numPeople; i--) {
        peopleArray.removeAt(i - 1);
      }
    }
  }

  onSubmit() {

    if(this.tripPlannerForm.invalid) {
      alert("Please fill all the fields");
      return;
    }
    else {
      console.log('Form values:', this.tripPlannerForm.value);
      const formValue = this.tripPlannerForm.value;
      this.placesFacade.saveTripFilter(formValue);
      this.placesFacade.postFilterGetPlaces({
        departure: formValue.from!,
        destination: formValue.to!,
        startDate: formValue.startDate!,
        endDate: formValue.endDate!,
        tags: formValue.activities!,
        participantNumber: formValue.people?.length!,
      });
    } 
  }

  categories = [
    {
      name: 'Popular',
      imageUrl: 'https://img.icons8.com/material-rounded/24/star--v1.png',
      selected: false,
    },
    {
      name: 'Historical',
      imageUrl:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABdElEQVR4nO3YPS9EQRSH8ScKjZcEn0CySkpKGgUasVFRUm5LQkFJSbktJS2ll6xkWyqhY7sVzVbEZuQmU4ldM8k5Z2wy/+RU99yZ+WVObnEhp3dzB7hfqhbRG9tf04C4LhXTG9svngwh3wh5tLrFJSrxZAj5RsijldNLGQfeDL9e70BJCzMPfBkg2sASytk1gOxoI3L+axYVx2rBErKtCNmyhJwqQk4sIQ+KkHsrRD/woQj59HuoZ0oR4XxNWkDWDSBrFpBDA8iBBeTSAHJhAWkYQF61EaMGCOdrTBMyZwiZ1YRUIg7yApSBIV/LwGPE+xVNSDUCUYzhz4z4ZyFrVDUh9cBDFDfRKauBa9S1EH1AK/AQxSh1ynDgGi2/p3gmIub7r4SuU9KAlBNAVjQg+wkgexqQ8wSQMw3IcwLIkzRiwP80s4a0gUFJyEzE5pIQB0xLQjYTQjYkIccJIUeSkOuEkCtJSDMhpCkJuU0IuZGE5GCUbyOe6fKbmFfkAAAAAElFTkSuQmCC',
      selected: false,
    },
    {
      name: 'Entertainment',
      imageUrl:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADyUlEQVR4nO2aW4hNURjHf0YuhVzKZdTEyLURiTzILZfkVkopRFKTTKSkZDzgwS2lEclMKA/Mk2aQeFA8ICKU5EGMccttMO63maNV36nVtvdel73PGab519d0zvrOWt9/f5f1rbUH2pAYJbQClAJNwFr+cxLNQEb+/nNkGoBfwDPgJDA7RKdMI5GVZvk+L7CJ50yIHAc6yPhICacwvSYZD8MY4ChQB3wX/bd4oEwWMj21TIRUJvDIWvFy2LzOJPR4LvMgon433mPO2SGkvYi4Pr1MjBz28PIVw5xW8InntzGLPnDMu64x6yt5jQN8Kkx7Sc77gd99c1kYGBtBYAXQyXGuv8i4lMkFAQM+WfxmFHAWaIzxRDsfEq5VS0fvgAGPDfqDgA+GnHCuVGn0RR0CBlww6FdakHhBC6BXwIgdBv27FkQ20QIYETBiskE/Kqw+AdeBZbk2WFWQPcAr4AtwW57+Ks2YeqDAME/YxldDHrHLIiTWG+boF0HkfYjuQOCS/DXCVrm7eEEtOhXoJiF0BPiqGbQ5pGyqz/OBUzG91P0Qu+pkrM5kn4vyam3RzoGx7IaYfdK1QE8ZmwDc9PDkpcC4+hwJF+Vbmp4yLosirb+aq7Uuj4AK4LcFiRMheZUTjwRbiAPa2CzgouYlReyqhfFKHgKLDPalmiOHAgZ8lqSNQnmE4So/rgE7gSkW1S1VdInoh6oi9EcDP0P0N0qBaDGsjHi6KrGnhXTDN2S8QU58NVpr34MWxNWYGH8K9NF0N8j354D+2lnjjnx/VsJpHLBF9OrF47+lv1Kht13yMjWMtEhYlegdRf+elOngPjIAeCn6zy0LQQY4DwxLg0iF5YLVhsQt1ELOVRqBOUlIdJY4t12wKoLMYOCJJ4mMyJcknlnisWC1FmYKQ+UCL5OCHPMlctFzQbUn9ZU5HkpBOCkJvFh2caW3X/OgqmbF0o/tjSj3ah5nDDHcMZlELTpdjsBBTBId1fJEoThkTnXr6IzdKYRCs/RfKtF1dJPxdwYbgtdNb/A4f2dLZRqi2pmDwEQ5mM20vKBIjIUpkogT1W/lFOdyTOCjkPC6eLNFkeX5wVXUzeMZYLm0LDnHthSN/wGcBpZadL0laZIokAYuifHKm5eBdRGlNy/vF+d6Gt+kGR932Mrb+8VaRwKq090qm5cPdBKZtMgUxlzT6HJbTnpWZ+gY+L5fNKLc4skPJ11EeWSN74Tt5BiqT6h23X2yG+cSpYEc8SahMENr9LLGJ3rB4ohSCadEJBTmifF5vZppjf+n0oY28A/hDwK/Ec3nMwbFAAAAAElFTkSuQmCC',
      selected: false,
    },
    {
      name: 'Adventure',
      imageUrl:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwklEQVR4nO2Y3YsOURzHP5ZlS8mFCOslSxuhpW1FT8q6VTaStzayuVxCUq4mRf4Atly4QPK2uOBCXkJcuKGUe7lRXlb7bNmVt0enftOeTufMGc/OPDNT863TMz3nzJnvZ+b3O/M7A6VKlUpLC4BBYETaXaCdApkfAmpG+yZ9udegxXzYblIAjUQAVCk4wDAF0J0IgBsUQO2OJFb/tVIQtUrCVqXdBpaRIy0B5lNATQUGgN/AWJFeTkrNwAMjrrcwrjbgOvAZ+CrHy4mnJuAAsF+OU9F5S2Iu0kLqk6X/B3A0hql92jm9aZjfDPw1zH3R+q9ELJ2qPfGUEYE29kzS5tXde2sxpcIpzIsxD0BYC+2yzF8BXmvjRoGVSQL0OAydlv51Mczr7SowU4w/dozpTxLgnuMi26T/8H8C1DzlxmiST6AlIjzCBL5WB0BUSzQH1jsuoifwe4+hi8Arz5gh7VgldGLa4bhgmMBzY9zRMBwqlnB8CXQbq1CiADs9j7knRqxPNubsAA4BXdp/qQFUHMa2S//ZGOt/HAVpAbTI+m0aWyz9zxJKyCAtAGRNdiVw1QOwNQ8ASn3AO6lCTzKuYQ/APHIC4NItD0CQd4A2CSkXgHpim/IMoLQC+BAB8RGYQ04BZmkvNL2iNNtDz54gyAJgmuy+whJ5ekThVzOS31QmAF3aRc8J0BTgggPgF7AmTwD9hsE32qcTVWL/sUBczhPAJYtBVVrY9rlh+w7MyANAh5gxQ2ShMe6pBaIva4DZjmVTbWxMbbSMe5ElQDPw3JGgnY5zHhlj1deNpVkBDDjetnsjztlgOedUFgAHHXdebXp8Mr/oqRBsaiTAajFbj3nXp5fuRgIcn4D5UPeNOY41EqBTezHVY15pLfBT5lC/aikOtUcD2E1KUhAngFUTmEOVEkcsJcUk+ajbK8elStEA/QOYaAN9q3fupAAAAABJRU5ErkJggg==',
      selected: false,
    },
    {
      name: 'Sport',
      imageUrl:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADLUlEQVR4nO1aTW+MURR+ptqqn+BjicTHwteYISXCsBmMioQVwYLSsrTtoloW+gdIakXFhiK0kVRXPncIUja2Ggki1dbMKye5b3Jcd973fk5HM09y0+Q9597nPO3Mueect0AD8wstAFYC2Asgy55nxbMVwqeusAzAOQDjAGYARGL1MJ8e9nxG+NIe2jtn2AJgFECFBRdpCOCrAmAEQL6Wga8F8KBKQKYCIrbuA1gTOvijAH5qBGMjIAIwBeA8gEyI4K9rBuEiIBJrMISAjQAmayBgUnB5QZv056R0+D2ggG8ANrF9GRGDNW4BuAagiT3bB6AcQEAZQJHtaRLcQ7bBn2GHD0i2/gACeiWOAWY7bZMqpySCTmZfCOCtRwGvAbQy/7OK7LTaRMCwgmRWKg92ehSwnfnmAPxW+NwxuWGrET2Tvg+jHgQ8Yn509ouEW5vEpSIpKFrHme9uDwJ2Mb+TKdxUdiRiiUaG+cRSK/2ccBDwnp3VDOBzCjfFtjhJQLdGtqC1je3pcxDQy3w6NLm7kgSMax5yle3Z6iAgx3xuanI/qRb8IqmeT7vuMyyl/rIQQKmxlX15v2pyE9cClYDNmgfEizqvGK8sBFC2ibHKkHu5SsARw0NKbO9tCwFUpsQ4aMjNS46/PsuXDBbvokoKe4HZCwr7fmbPO3A3UDfYAOCCwVon3ciyvZ3Z2xV22hNjvSE3xfoPDs/hl7jDkPuQSkC2xmn0pUMaVbacbQYX2RfPF1nG4CKbFpx1UUrkmc8NTe4xJKDLopjrdxBwkfkc0OSmbs1rOf3RQcAH3+U0RNOQdMgx5rvHQ0NTYH4nUrh591YV+YQDnkpzosceBIwwP6pKn7u2lIS7VZp6PnQqeGzqd0hV8axLUw8xJZbHKqeYndLYO48C3kipsdN1rCIfckWyXQ4w2OpLGGzxX54RhhSjxVLCSw0XARUxtvQ2WlQNd+nz+UMjGBsBkRgcE4e34e5/P17nGDQIwkVAFOoFRy1fMQUFpdh7AQQM26RKF+TE1V52EFAG8NDkhg2BpaKKHRO1epqAaeFLe6h4rCs0i6FTUfGvBkVhI58G5g3+AKAD65HrBuEFAAAAAElFTkSuQmCC',
      selected: false,
    },
    {
      name: 'Nature',
      imageUrl:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACHUlEQVR4nO2YT0gVQRzHP+oL0UNCkSCKdVEvXsRSD5JeFEGibnmWhydv4bkCwShPHqNLYdLpgQf/nBT1IkJBGqSeRCFIhCL6J5UjA79gWvb51sfuvpmYD3zh7czAfr/Lm/39dsDj8Xg84ZTxHzAIDOE4F4BtYBfI4DD3ACUaxlFqgU9GkD2gEgd5KgHmgbfyexTHaAN+A8dAC3BHgnwAqnGIFTH+xBhbl7ExHGFIDH8Eaozxfhk/Ai5iOVWyqbXhbMj8sszdx3IeiNE3QEXIfLfMfwYuYykNwFcxevOMdYuy5hGW8koMzhRY1w6cAN+BeiyjW8x9AxojrM9J6Cksohx4Lcb0HjHRlfwF8DDQAbcCf4CfEYOnQtZoQ6aNNuSSUU+Cc3qj78v4MyygRuqFMrQKdAE7gXGttZC5X0BTmqZ7pRE0mQwxW4xephUiI09xywjTLL1UHEH0ftH7JnFGjJu+B+qAuZhC/FUujbbjIHDT4HUcOgGuJxlkLAHT+bSQ5FvpKMUgCuhJIsh4yiGUvKJj5QrwpQRBFNAXZ5CpEoVQwIbR0nQCt4oNcU36IFVC3ZaW5p3UMH1Gdm6elziEAjaBx8b1uU9gWuUERFmmw8AZQEFmLTCt8mgiaogOqbDKUv0ArkYJsmSBWVVA+rvmTAYsMKkiSP9jbuQLUWZ8rrqglXxB7lpgThVRZ/6hQr4xlGPaKbZIejwej8eDwSnM+c9tyltT6QAAAABJRU5ErkJggg==',
      selected: false,
    },
  ];

  toggleSelection(category: { name: string; selected: boolean }) {
    category.selected = !category.selected;

    const activites = this.tripPlannerForm.get('activities') as FormArray;
    const categoryNameUpperCase = category.name.toUpperCase();

    if (category.selected) {
      activites.push(new FormControl(categoryNameUpperCase));
    } else {
      const index = activites.controls.findIndex(
        (x) => x.value === categoryNameUpperCase
      );
      activites.removeAt(index);
    }
  }
}
