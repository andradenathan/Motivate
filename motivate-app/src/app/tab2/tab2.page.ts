import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {RecipeService} from '../services/recipe.service';
import {ChallengeServiceService} from '../services/challenge-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  challenges = [];

  recipeForm: FormGroup;
  photo: SafeResourceUrl;
  editMode = false;

  challenge = JSON.parse(localStorage.getItem('challenge'));
  // challenge_id = this.challenge.id;

  recipes = [];

  constructor(public formbuilder: FormBuilder, private router: Router, private sanitizer:DomSanitizer, public recipeService: RecipeService, public challengeServiceService: ChallengeServiceService) {
  this.recipeForm = this.formbuilder.group({
    title:[null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
    challenge:[null, [Validators.required]],
    subtitle:[null],
    ingredients:[null, [Validators.required, Validators.maxLength(500), Validators.minLength(3)]],
    preparation: [null, [Validators.required, Validators.maxLength(600), Validators.minLength(3)]]
    

  }
    
  );
 }

 onSubmit(form){
   console.log(form.value);
 }


ngOnInit() {
  this.listChallenges();
  console.log("Poste uma receita.");
}

async takePicture(){
  const image = await
  Plugins.Camera.getPhoto({
    quality: 100,
    allowEditing: true,
    saveToGallery: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Camera
  });
  this.photo =
  this.sanitizer.bypassSecurityTrustResourceUrl
  (image && (image.dataUrl));
}

GoToHome(){
  this.router.navigate(['/tabs/home']);
}

listChallenges(){
  this.challengeServiceService.getListChallenges().subscribe(
    (res)=>{
      console.log(res);
      this.challenges = res.challengeList;
    },
    (err)=>{
      console.log(err);
    }
  );
}

createRecipe(form){
  console.log(form);
  let body = form.value;
  this.recipeService.createRecipe(body).subscribe(
  (res) => {console.log(res);
    this.router.navigate(["/tabs/home"]);
  }, (err) => {console.log(err); }
  )
}

deleteRecipe(id){
  this.recipeService.deleteRecipe(id).subscribe(
    (res)=>{
      console.log(res);
      console.log('Mais que cancelado:' +id);
    }, (err) =>{
      console.log(err);
    }
  );
  
}



}

