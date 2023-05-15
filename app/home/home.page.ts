import { BdService } from './../../Services/bd.service';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Item, ItemDos } from 'src/Models/item';
import { FormsModule } from '@angular/forms';
import { ToastService } from 'src/Services/toast.service';
import { LoadingService } from 'src/Services/loading.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,FormsModule,CommonModule],
})
export class HomePage {
  private enlace:string = 'Personas';
  private enlace2:string = 'Comidas';
  public Personas:Item[]=[];
  public Comida:ItemDos[]=[];


  public newPersona:Item={
    repeticion: '',
    nombre_P: '',
    id: '',
    tiempo: '',
    foto: '',
    Desc:''

  };

  public newComida:ItemDos={
    id2: '',
    nomP:'',
    Calorias:'',
    Ing1:'',
    Ing2:'',
    Ing3:'',
    Ing4:'',
    Ing5:'',
    Ing6:'',
    Ing7:'',
    Ing8:'',
    foto2:''
    
    
  };


  newI = '';

  constructor(private bd:BdService, private toast:ToastService, private load:LoadingService ) {}
  ngOnInit() {
    this.bd.get<Item>(this.enlace).subscribe(p=>{
      this.Personas=p;
    });

    this.bd.get<ItemDos>(this.enlace2).subscribe(c=>{
      this.Comida=c;
    });
  }
  save(){
    this.load.presentLoading();
    this.newPersona.id=this.bd.createId(this.enlace);
    const data = this.newPersona;
    this.bd.add<Item>(data,this.enlace,this.newPersona.id).then(()=>{
      this.toast.showToast("Exito al guardar","success","checkbox-outline");
      this.load.dismissLoading();
      this.clean();
    }).catch(()=>{
      this.toast.showToast("Error al guardar","danger","sad-outline");
    });

    
  }

  save2(){
    this.load.presentLoading();
    this.newComida.id2=this.bd.createId(this.enlace2);
    const dato = this.newComida;
    this.bd.add<ItemDos>(dato,this.enlace2,this.newComida.id2).then(()=>{
      this.toast.showToast("Exito al guardar","success","checkbox-outline");
      this.load.dismissLoading();
      this.clean2();
    }).catch(()=>{
      this.toast.showToast("Error al guardar","danger","sad-outline");
    });
  }

  delete(p:Item){
    
    this.load.presentLoading();
    this.bd.delete(`Personas`,p.id).then(()=>{
      this.toast.showToast("Exito al Borrar","success","trash-outline");
      this.load.dismissLoading();
    }).catch(()=>{
      this.toast.showToast("Error al Borrar","danger","sad-outline");
    });

  }

  delete2(c:ItemDos){
    
    this.load.presentLoading();
    this.bd.delete(`Comidas`,c.id2).then(()=>{
      this.toast.showToast("Exito al Borrar","success","trash-outline");
      this.load.dismissLoading();
    }).catch(()=>{
      this.toast.showToast("Error al Borrar","danger","sad-outline");
    });

  }

  clean(){
    this.newPersona.id="";
    this.newPersona.repeticion="";
    this.newPersona.nombre_P="";
    this.newPersona.tiempo="";
    this.newPersona.foto="";
    this.newPersona.Desc="";

    }

    clean2(){
      this.newComida.id2="";
    this.newComida.nomP="";
    this.newComida.Calorias="";
    this.newComida.Ing1="";
    this.newComida.Ing2="";
    this.newComida.Ing3="";
    this.newComida.Ing4="";
    this.newComida.Ing5="";
    this.newComida.Ing6="";
    this.newComida.Ing7="";
    this.newComida.Ing8="";
    this.newComida.foto2="";
    }

    newImage(event: any)
    {
      if (event.target.files && event.target.files[0])
        {
          const reader = new FileReader();
          reader.onload = ((image) =>{
            this.newI = image.target?.result as string;

          });
          reader.readAsDataURL(event.target.files[0])
 
        }
    }



  }

  

  

