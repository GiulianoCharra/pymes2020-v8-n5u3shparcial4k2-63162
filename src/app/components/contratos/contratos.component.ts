import { Component, OnInit } from "@angular/core";
import { Contrato } from "../../models/contrato";
import { ContratosService } from "../../services/contratos.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDialogService } from "../../services/modal-dialog.service";

@Component({
  selector: "app-contratos",
  templateUrl: "./contratos.component.html",
  styleUrls: ["./contratos.component.css"]
})
export class ContratosComponent implements OnInit {
  Titulo = "Contratos";

  TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)"
  };

  AccionABMC = "L";
  Mensajes = {
    SD: " No se encontraron registros...",
    RD: " Revisar los datos ingresados..."
  };

  Lista: Contrato[] = [];
  SinBusquedasRealizadas = true;
  FormFiltro: FormGroup;
  FormReg: FormGroup;
  submitted = false;

  constructor(
    public formBuilder: FormBuilder,
    private ContratosServicio: ContratosService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.Buscar();
    this.FormFiltro = this.formBuilder.group({});
    this.FormReg = this.formBuilder.group({
      ContratoDescripcion: [
        "",
        [Validators.required, Validators.minLength(2), Validators.maxLength(55)]
      ],
      ContratoImporte: [
        null,
        [Validators.required, Validators.pattern("[0-9]{1,7}d{0,2}")]
      ]
    });
  }

  Agregar() {
    this.AccionABMC = "A";
    this.FormReg.reset();
    this.submitted = false;
    this.FormReg.markAsUntouched();
  }

  Buscar() {
    this.SinBusquedasRealizadas = false;
    this.ContratosServicio.get().subscribe((res: Contrato[]) => {
      this.Lista = res;
    });
  }

  Grabar() {
    this.submitted = true;
    // verificar que los validadores esten OK
    if (this.FormReg.invalid) {
      return;
    }

    const itemCopy = { ...this.FormReg.value };
      this.ContratosServicio.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert("Registro agregado correctamente.");
        this.Buscar();
      });
    
  }

  Volver() {
    this.AccionABMC = "L";
  }
}
