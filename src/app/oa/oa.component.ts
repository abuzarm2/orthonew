import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
  NgForm,
} from '@angular/forms';
import { Arr } from 'src/app/model';
/**
 * @title Basic expansion panel
 *
 */


@Component({
  selector: 'app-oa',
  templateUrl: './oa.component.html',
  styleUrls: ['./oa.component.css']
})
export class OAComponent {
  firstScreen:boolean=true;
  secondScreen:boolean=false;
  map_col={}
  arr: Arr = { Factors: '0', Levels: '0' };
  addForm: FormGroup;
  displayedColumns=[]
  rows: FormArray;
  itemForm: FormGroup;

  Factors=0
  Number_of_factor: string = '0';

  /**Initializing row as array of form builder*/
  constructor(private fb: FormBuilder) {
    this.rows = this.fb.array([]);
  }

  /**Adding rows to form group */
  ngOnInit() {
    this.addForm.addControl('rows', this.rows);
  }
  
  /**Getting the factor value and generating columns based on Factor value*/
  onSave() {
    for (let index = 0; index < Number(this.Factors); index++) {
      this.displayedColumns.push(String(index));
    }
    this.firstScreen=false;
    this.secondScreen=true;
    console.log(this.displayedColumns);

    for(let i=0 ; i< Number(this.Factors); i++)
    {
      this.rows.push(this.createItemFormGroup());
    }
  }

  /**used to create element of form array*/
  createItemFormGroup(): FormGroup {
    return this.fb.group({
      Factor_name: null,
      Level_values: null,
    });
  }
}
