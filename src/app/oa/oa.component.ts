import { Component } from '@angular/core';
import * as $ from 'jquery';
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
  rows=[];
  flagoa=false;
  flagnext=true;

  Factors=0
  Number_of_factor: string = '0';


  /**Initializing row as array of form builder*/
  

  /**Adding rows to form group */
  ngOnInit() {
    
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
      this.rows.push({
        Factor_name:'',
        Level_count: '',
        Level_value:[],
        Level_values:''
      });
    }
  }
  
  display(){
    for(let i=0;i<Number(this.Factors);i++){
      for(let j=0;j<Number(this.rows[i].Level_count);j++){
        this.rows[i].Level_value.push({value:''})
      }
    }
    console.log("level_values:")
    console.log(this.rows)
    this.flagoa=true;
    this.flagnext=false;
    $('.inputId').prop('readonly', true);
  }
  /**used to create element of form array*/


  CreateOA(){
    for(let i=0;i<Number(this.Factors);i++){
      for(let j=0;j<this.rows[i].Level_value.length;j++){
        
        this.rows[i].Level_values+=this.rows[i].Level_value[j].value
        this.rows[i].Level_values+=','
      }
      this.rows[i].Level_values=this.rows[i].Level_values.slice(0,this.rows[i].Level_values.length-1)
  }
  
  console.log(this.rows)
  }

  emptylist(){
    if(this.flagnext==true){
      $(".inputId").val(' ');
      this.rows=[]
      this.onSave()
    }
    else if(this.flagoa==true)
    {
      $(".inputlevels").val(' ');
      for(let i=0;i<Number(this.Factors);i++){
        this.rows[i].Level_value=[] 
      }
      for(let i=0;i<Number(this.Factors);i++){
        for(let j=0;j<Number(this.rows[i].Level_count);j++){
          this.rows[i].Level_value.push({value:''})
        }
      }
    }

  }

  backfunction(){
    if(this.flagoa==true)
    {
      $(".inputlevels").val(' ');
      for(let i=0;i<Number(this.Factors);i++){
        this.rows[i].Level_value=[] 
      }
      this.flagoa=false
      this.flagnext=true
    }
    else if(this.flagnext==true)
    {
      $(".inputId").val(' ');
      this.rows=[]
      this.firstScreen=true
      this.secondScreen=false
    }
  }
}
