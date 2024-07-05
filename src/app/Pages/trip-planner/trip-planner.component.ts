import { CommonModule, JsonPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trip-planner',
  standalone: true,
  imports: [FormsModule, JsonPipe, NgbModule, NgClass, CommonModule, ReactiveFormsModule],
  templateUrl: './trip-planner.component.html',
  styleUrl: './trip-planner.component.scss',
})

export class TripPlannerComponent {

  tripPlannerForm = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    activities: new FormArray([]),
    numPeople: new FormControl(1),
  });

  get numPeople() {
    return this.tripPlannerForm.get('numPeople')?.value;
  }

  onSubmit() {
    if (this.tripPlannerForm.valid) {
        // Log the form values to console
        console.log('Form values:', this.tripPlannerForm.value);
        
        // You can also send this data to a service or perform other actions as needed
    } else {
        console.error('Form is invalid.');
    }
  }

  categories = [
    { name: 'Popular', imageUrl: 'https://img.icons8.com/material-rounded/24/star--v1.png', selected: false },
    { name: 'Historical', imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABdElEQVR4nO3YPS9EQRSH8ScKjZcEn0CySkpKGgUasVFRUm5LQkFJSbktJS2ll6xkWyqhY7sVzVbEZuQmU4ldM8k5Z2wy/+RU99yZ+WVObnEhp3dzB7hfqhbRG9tf04C4LhXTG9svngwh3wh5tLrFJSrxZAj5RsijldNLGQfeDL9e70BJCzMPfBkg2sASytk1gOxoI3L+axYVx2rBErKtCNmyhJwqQk4sIQ+KkHsrRD/woQj59HuoZ0oR4XxNWkDWDSBrFpBDA8iBBeTSAHJhAWkYQF61EaMGCOdrTBMyZwiZ1YRUIg7yApSBIV/LwGPE+xVNSDUCUYzhz4z4ZyFrVDUh9cBDFDfRKauBa9S1EH1AK/AQxSh1ynDgGi2/p3gmIub7r4SuU9KAlBNAVjQg+wkgexqQ8wSQMw3IcwLIkzRiwP80s4a0gUFJyEzE5pIQB0xLQjYTQjYkIccJIUeSkOuEkCtJSDMhpCkJuU0IuZGE5GCUbyOe6fKbmFfkAAAAAElFTkSuQmCC', selected: false },
    { name: 'Entertainment', imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADyUlEQVR4nO2aW4hNURjHf0YuhVzKZdTEyLURiTzILZfkVkopRFKTTKSkZDzgwS2lEclMKA/Mk2aQeFA8ICKU5EGMccttMO63maNV36nVtvdel73PGab519d0zvrOWt9/f5f1rbUH2pAYJbQClAJNwFr+cxLNQEb+/nNkGoBfwDPgJDA7RKdMI5GVZvk+L7CJ50yIHAc6yPhICacwvSYZD8MY4ChQB3wX/bd4oEwWMj21TIRUJvDIWvFy2LzOJPR4LvMgon433mPO2SGkvYi4Pr1MjBz28PIVw5xW8InntzGLPnDMu64x6yt5jQN8Kkx7Sc77gd99c1kYGBtBYAXQyXGuv8i4lMkFAQM+WfxmFHAWaIzxRDsfEq5VS0fvgAGPDfqDgA+GnHCuVGn0RR0CBlww6FdakHhBC6BXwIgdBv27FkQ20QIYETBiskE/Kqw+AdeBZbk2WFWQPcAr4AtwW57+Ks2YeqDAME/YxldDHrHLIiTWG+boF0HkfYjuQOCS/DXCVrm7eEEtOhXoJiF0BPiqGbQ5pGyqz/OBUzG91P0Qu+pkrM5kn4vyam3RzoGx7IaYfdK1QE8ZmwDc9PDkpcC4+hwJF+Vbmp4yLosirb+aq7Uuj4AK4LcFiRMheZUTjwRbiAPa2CzgouYlReyqhfFKHgKLDPalmiOHAgZ8lqSNQnmE4So/rgE7gSkW1S1VdInoh6oi9EcDP0P0N0qBaDGsjHi6KrGnhXTDN2S8QU58NVpr34MWxNWYGH8K9NF0N8j354D+2lnjjnx/VsJpHLBF9OrF47+lv1Kht13yMjWMtEhYlegdRf+elOngPjIAeCn6zy0LQQY4DwxLg0iF5YLVhsQt1ELOVRqBOUlIdJY4t12wKoLMYOCJJ4mMyJcknlnisWC1FmYKQ+UCL5OCHPMlctFzQbUn9ZU5HkpBOCkJvFh2caW3X/OgqmbF0o/tjSj3ah5nDDHcMZlELTpdjsBBTBId1fJEoThkTnXr6IzdKYRCs/RfKtF1dJPxdwYbgtdNb/A4f2dLZRqi2pmDwEQ5mM20vKBIjIUpkogT1W/lFOdyTOCjkPC6eLNFkeX5wVXUzeMZYLm0LDnHthSN/wGcBpZadL0laZIokAYuifHKm5eBdRGlNy/vF+d6Gt+kGR932Mrb+8VaRwKq090qm5cPdBKZtMgUxlzT6HJbTnpWZ+gY+L5fNKLc4skPJ11EeWSN74Tt5BiqT6h23X2yG+cSpYEc8SahMENr9LLGJ3rB4ohSCadEJBTmifF5vZppjf+n0oY28A/hDwK/Ec3nMwbFAAAAAElFTkSuQmCC', selected: false },
    { name: 'Adventure', imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwklEQVR4nO2Y3YsOURzHP5ZlS8mFCOslSxuhpW1FT8q6VTaStzayuVxCUq4mRf4Atly4QPK2uOBCXkJcuKGUe7lRXlb7bNmVt0enftOeTufMGc/OPDNT863TMz3nzJnvZ+b3O/M7A6VKlUpLC4BBYETaXaCdApkfAmpG+yZ9udegxXzYblIAjUQAVCk4wDAF0J0IgBsUQO2OJFb/tVIQtUrCVqXdBpaRIy0B5lNATQUGgN/AWJFeTkrNwAMjrrcwrjbgOvAZ+CrHy4mnJuAAsF+OU9F5S2Iu0kLqk6X/B3A0hql92jm9aZjfDPw1zH3R+q9ELJ2qPfGUEYE29kzS5tXde2sxpcIpzIsxD0BYC+2yzF8BXmvjRoGVSQL0OAydlv51Mczr7SowU4w/dozpTxLgnuMi26T/8H8C1DzlxmiST6AlIjzCBL5WB0BUSzQH1jsuoifwe4+hi8Arz5gh7VgldGLa4bhgmMBzY9zRMBwqlnB8CXQbq1CiADs9j7knRqxPNubsAA4BXdp/qQFUHMa2S//ZGOt/HAVpAbTI+m0aWyz9zxJKyCAtAGRNdiVw1QOwNQ8ASn3AO6lCTzKuYQ/APHIC4NItD0CQd4A2CSkXgHpim/IMoLQC+BAB8RGYQ04BZmkvNL2iNNtDz54gyAJgmuy+whJ5ekThVzOS31QmAF3aRc8J0BTgggPgF7AmTwD9hsE32qcTVWL/sUBczhPAJYtBVVrY9rlh+w7MyANAh5gxQ2ShMe6pBaIva4DZjmVTbWxMbbSMe5ElQDPw3JGgnY5zHhlj1deNpVkBDDjetnsjztlgOedUFgAHHXdebXp8Mr/oqRBsaiTAajFbj3nXp5fuRgIcn4D5UPeNOY41EqBTezHVY15pLfBT5lC/aikOtUcD2E1KUhAngFUTmEOVEkcsJcUk+ajbK8elStEA/QOYaAN9q3fupAAAAABJRU5ErkJggg==', selected: false },
    { name: 'Sport', imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADLUlEQVR4nO1aTW+MURR+ptqqn+BjicTHwteYISXCsBmMioQVwYLSsrTtoloW+gdIakXFhiK0kVRXPncIUja2Ggki1dbMKye5b3Jcd973fk5HM09y0+Q9597nPO3Mueect0AD8wstAFYC2Asgy55nxbMVwqeusAzAOQDjAGYARGL1MJ8e9nxG+NIe2jtn2AJgFECFBRdpCOCrAmAEQL6Wga8F8KBKQKYCIrbuA1gTOvijAH5qBGMjIAIwBeA8gEyI4K9rBuEiIBJrMISAjQAmayBgUnB5QZv056R0+D2ggG8ANrF9GRGDNW4BuAagiT3bB6AcQEAZQJHtaRLcQ7bBn2GHD0i2/gACeiWOAWY7bZMqpySCTmZfCOCtRwGvAbQy/7OK7LTaRMCwgmRWKg92ehSwnfnmAPxW+NwxuWGrET2Tvg+jHgQ8Yn509ouEW5vEpSIpKFrHme9uDwJ2Mb+TKdxUdiRiiUaG+cRSK/2ccBDwnp3VDOBzCjfFtjhJQLdGtqC1je3pcxDQy3w6NLm7kgSMax5yle3Z6iAgx3xuanI/qRb8IqmeT7vuMyyl/rIQQKmxlX15v2pyE9cClYDNmgfEizqvGK8sBFC2ibHKkHu5SsARw0NKbO9tCwFUpsQ4aMjNS46/PsuXDBbvokoKe4HZCwr7fmbPO3A3UDfYAOCCwVon3ciyvZ3Z2xV22hNjvSE3xfoPDs/hl7jDkPuQSkC2xmn0pUMaVbacbQYX2RfPF1nG4CKbFpx1UUrkmc8NTe4xJKDLopjrdxBwkfkc0OSmbs1rOf3RQcAH3+U0RNOQdMgx5rvHQ0NTYH4nUrh591YV+YQDnkpzosceBIwwP6pKn7u2lIS7VZp6PnQqeGzqd0hV8axLUw8xJZbHKqeYndLYO48C3kipsdN1rCIfckWyXQ4w2OpLGGzxX54RhhSjxVLCSw0XARUxtvQ2WlQNd+nz+UMjGBsBkRgcE4e34e5/P17nGDQIwkVAFOoFRy1fMQUFpdh7AQQM26RKF+TE1V52EFAG8NDkhg2BpaKKHRO1epqAaeFLe6h4rCs0i6FTUfGvBkVhI58G5g3+AKAD65HrBuEFAAAAAElFTkSuQmCC', selected: false },
    { name: 'Nature', imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADyUlEQVR4nO2aW4hNURjHf0YuhVzKZdTEyLURiTzILZfkVkopRFKTTKSkZDzgwS2lEclMKA/Mk2aQeFA8ICKU5EGMccttMO63maNV36nVtvdel73PGab519d0zvrOWt9/f5f1rbUH2pAYJbQClAJNwFr+cxLNQEb+/nNkGoBfwDPgJDA7RKdMI5GVZvk+L7CJ50yIHAc6yPhICacwvSYZD8MY4ChQB3wX/bd4oEwWMj21TIRUJvDIWvFy2LzOJPR4LvMgon433mPO2SGkvYi4Pr1MjBz28PIVw5xW8InntzGLPnDMu64x6yt5jQN8Kkx7Sc77gd99c1kYGBtBYAXQyXGuv8i4lMkFAQM+WfxmFHAWaIzxRDsfEq5VS0fvgAGPDfqDgA+GnHCuVGn0RR0CBlww6FdakHhBC6BXwIgdBv27FkQ20QIYETBiskE/Kqw+AdeBZbk2WFWQPcAr4AtwW57+Ks2YeqDAME/YxldDHrHLIiTWG+boF0HkfYjuQOCS/DXCVrm7eEEtOhXoJiF0BPiqGbQ5pGyqz/OBUzG91P0Qu+pkrM5kn4vyam3RzoGx7IaYfdK1QE8ZmwDc9PDkpcC4+hwJF+Vbmp4yLosirb+aq7Uuj4AK4LcFiRMheZUTjwRbiAPa2CzgouYlReyqhfFKHgKLDPalmiOHAgZ8lqSNQnmE4So/rgE7gSkW1S1VdInoh6oi9EcDP0P0N0qBaDGsjHi6KrGnhXTDN2S8QU58NVpr34MWxNWYGH8K9NF0N8j354D+2lnjjnx/VsJpHLBF9OrF47+lv1Kht13yMjWMtEhYlegdRf+elOngPjIAeCn6zy0LQQY4DwxLg0iF5YLVhsQt1ELOVRqBOUlIdJY4t12wKoLMYOCJJ4mMyJcknlnisWC1FmYKQ+UCL5OCHPMlctFzQbUn9ZU5HkpBOCkJvFh2caW3X/OgqmbF0o/tjSj3ah5nDDHcMZlELTpdjsBBTBId1fJEoThkTnXr6IzdKYRCs/RfKtF1dJPxdwYbgtdNb/A4f2dLZRqi2pmDwEQ5mM20vKBIjIUpkogT1W/lFOdyTOCjkPC6eLNFkeX5wVXUzeMZYLm0LDnHthSN/wGcBpZadL0laZIokAYuifHKm5eBdRGlNy/vF+d6Gt+kGR932Mrb+8VaRwKq090qm5cPdBKZtMgUxlzT6HJbTnpWZ+gY+L5fNKLc4skPJ11EeWSN74Tt5BiqT6h23X2yG+cSpYEc8SahMENr9LLGJ3rB4ohSCadEJBTmifF5vZppjf+n0oY28A/hDwK/Ec3nMwbFAAAAAElFTkSuQmCC', selected: false }
  ];

  toggleSelection(category: { selected: boolean; }) {
    category.selected = !category.selected;
  }

  rangeValue: number = 50;

  calendar = inject(NgbCalendar);
  formatter = inject(NgbDateParserFormatter);

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = this.calendar.getToday();
  toDate: NgbDate | null = this.calendar.getNext(
    this.calendar.getToday(), 'd', 10);

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}
