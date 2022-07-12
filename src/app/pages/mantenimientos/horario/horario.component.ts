import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  horariosForm = this.fb.group({
    lunesEmpieza:['',[Validators.required]],
    lunesTermina:['',[Validators.required]],
    martesEmpieza:['',[Validators.required]],
    martesTermina:['',[Validators.required]],
    miercolesEmpieza:['',[Validators.required]],
    miercolesTermina:['',[Validators.required]],
    juevesEmpieza:['',[Validators.required]],
    juevesTermina:['',[Validators.required]],
    viernesEmpieza:['',[Validators.required]],
    viernesTermina:['',[Validators.required]]
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      console.log(params);
    })
  }

}
