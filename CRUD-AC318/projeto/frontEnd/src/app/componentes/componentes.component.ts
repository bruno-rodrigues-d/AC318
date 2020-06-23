import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { ComponentesService } from '../shared/componentes.service';
import { Componentes } from '../shared/componentes.model';

declare var M: any;

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.css'],
  providers: [ComponentesService]
})
export class ComponentesComponent implements OnInit {

  constructor(public componentesService: ComponentesService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshComponentesList();
  }

  resetForm(form?: NgForm){
    if(form)
      form.reset();
    this.componentesService.selectedComponentes = {
      _id: "",
      codigo: null,
      nome: "",
      valor: "",
      preco: "",
      quantidade: null
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.componentesService.postComponentes(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshComponentesList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.componentesService.putComponentes(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshComponentesList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshComponentesList() {
    this.componentesService.getComponentesList().subscribe((res) => {
      this.componentesService.componentes = res as Componentes[];
    });
  }
  onEdit(comp: Componentes) {
    this.componentesService.selectedComponentes = comp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.componentesService.deleteComponentes(_id).subscribe((res) => {
        this.refreshComponentesList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
