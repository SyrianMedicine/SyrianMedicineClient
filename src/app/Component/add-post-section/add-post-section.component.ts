import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { PostCreateInput } from 'src/app/Models/Post/PostCreateInput';
import { PostOutput } from 'src/app/Models/Post/PostOutput';
import { PostService } from 'src/app/Services/post/post.service';
import { SyrianMedSnakBarService } from 'src/app/Services/SyrianMedSnakBar/syrian-med-snak-bar.service';
 

@Component({
  selector: 'app-add-post-section',
  templateUrl: './add-post-section.component.html',
  styleUrls: ['./add-post-section.component.scss']
})
export class AddPostSectionComponent implements OnInit {
  chooseFile:boolean = false;
  isCreating:boolean = false;
  @Output() onPostAdded: EventEmitter<PostOutput> = new EventEmitter();
  postCreateData:PostCreateInput=new PostCreateInput();
  postText!:string;
 
 
  constructor(private snackBar:SyrianMedSnakBarService,private postService :PostService , public dialog:MatDialogRef<AddPostSectionComponent>,private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {

  }
  async onfilselected(event:Event){ 
    let element=(event.currentTarget as HTMLInputElement); 
    this.postCreateData.Media=element.files?.item(0);
  }
  async sendpost( event:any){  
    if(this.chooseFile == false){ 
      this.postCreateData.Media=null;
    }
    this.postCreateData.PostText=event.target.text.value;  
    this.postCreateData.type=1;
    this.isCreating=true;
    (await this.postService.CreatePost(this.postCreateData)).subscribe(data=>{
      this.onPostAdded.emit(data.data)
      this.snackBar.openSuccess(data.message);
      this.isCreating=false;  
      this.close();
    },err=>{
      console.log(err); 
      this.snackBar.openError(err.error.message);
      this.isCreating=false;
    });
    
  }
  onChange(ob:MatSlideToggleChange){
    if(ob.checked == false){
      this.chooseFile = false
    }
    else
    {
      this.chooseFile = true 
    }
  }
  close(){
    this.dialog.close();
  }

}
