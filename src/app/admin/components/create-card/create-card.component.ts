import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Store } from '@ngrx/store'
import { addCustomVideo } from 'src/app/redux/actions/videos.actions'
import { AppState, EVideoType } from 'src/app/redux/state/app.state'
import { IVideoCard } from '../../models/video-card.model'

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent {
  card: IVideoCard = {
    kind: EVideoType.Custom,
    title: '',
    description: '',
    imageUrl: '',
    videoId: '',
    creationDate: Date().toString()
  }

  constructor(private store: Store<AppState>) {}

  onSubmit(form: NgForm): void {
    this.store.dispatch(
      addCustomVideo({
        video: { ...this.card }
      })
    )
    form.reset()
  }
}
