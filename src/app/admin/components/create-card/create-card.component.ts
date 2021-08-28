import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { IVideoCard } from '../../models/video-card.model'

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent {
  card?: IVideoCard

  onSubmit(form: NgForm): void {
    console.log(form.form.value)
  }
}
