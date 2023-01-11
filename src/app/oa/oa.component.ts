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
  data: Array<{}> = [];
  id:string=''
  SelectedItem='';
  flag_table:boolean=false;
  onscreen=[]
   radio_list=[]
  fetched_list=[];
  displayedColumns = [];
  rows: FormArray;
  map_col={}
  Fac=0;
  arr: Arr = { Factors: '0', Levels: '0' };
  addForm: FormGroup;
  panelOpenState: boolean = false;
  flag: boolean = true;

  obj: any;
  Gen_flag: boolean = false;
  Number_of_factor: string = '0';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required],
    });
    this.rows = this.fb.array([]);
  }
  ngOnInit() {
    this.addForm.get('items').valueChanges.subscribe((val) => {
      if (val === true) {
        this.addForm.get('items_value').setValue('yes');

        this.addForm.addControl('rows', this.rows);
      }
      if (val === false) {
        this.addForm.get('items_value').setValue('no');
        this.addForm.removeControl('rows');
      }
    });
  }

  onSave() {
    this.Gen_flag = false;
    for (let index = 0; index < Number(this.arr.Factors); index++) {
      this.displayedColumns.push(String(index));
    }
    this.firstScreen=false;
    this.secondScreen=true;
    console.log(this.displayedColumns);
  }
 
  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      Factor_name: null,
      Level_values: null,
    });
  }
}
