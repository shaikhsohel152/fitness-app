import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cardio',
  templateUrl: './cardio.component.html',
  styleUrls: ['./cardio.component.css']
})
export class CardioComponent {

  // registerForm!: FormGroup;

  // constructor(private fb: FormBuilder) {}

  // ngOnInit(): void {
  //   this.registerForm = this.fb.group({
  //     name: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.pattern('^[a-zA-Z ]*$')
  //       ]
  //     ],
  //     email: ['', [Validators.required, Validators.email]],
  //     phone: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.pattern('^[0-9]{10}$')
  //       ]
  //     ],
  //     goal: ['', Validators.required]
  //   });
  // }

  // submitForm() {
  //   if (this.registerForm.invalid) {
  //     this.registerForm.markAllAsTouched();
  //     return;
  //   }

  //   console.log(this.registerForm.value);
  //   alert('Registration Successful 💪');
  //   this.registerForm.reset();
  // }

   trainers = [
    {
      id: 1,
      name: 'Alex Johnson',
      specialty: 'Strength Training',
      description: 'Certified trainer with 10+ years experience in building muscle and endurance.',
      photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', // Placeholder photo
      rating: 4.9
    },
    {
      id: 2,
      name: 'Maria Gonzalez',
      specialty: 'Yoga & Flexibility',
      description: 'Holistic approach to wellness, focusing on mind-body connection.',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
      rating: 5.0
    },
    {
      id: 3,
      name: 'David Lee',
      specialty: 'Cardio & HIIT',
      description: 'High-intensity workouts for fat loss and cardiovascular health.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      rating: 4.8
    }
  ];

  bookSession(trainer: any) {
    alert(`Booking session with ${trainer.name}. (Integrate with your booking logic here.)`);
  }
}

