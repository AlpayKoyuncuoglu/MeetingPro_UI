// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   registerForm: FormGroup;
//   errorMessage: string | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     this.registerForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', Validators.required]
//     }, { 
//       validator: this.passwordMatchValidator 
//     });
//   }

//   passwordMatchValidator(form: FormGroup) {
//     return form.get('password')?.value === form.get('confirmPassword')?.value
//       ? null : { 'mismatch': true };
//   }

//   onSubmit() {
//     if (this.registerForm.valid) {
//       const { username, password } = this.registerForm.value;
//       this.authService.register(username, password).subscribe({
//         next: () => this.router.navigate(['/login']),
//         error: err => this.errorMessage = 'Registration failed. Please try again.'
//       });
//     }
//   }
// }
//*********************************************************** */
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   registerForm: FormGroup;
//   errorMessage: string | null = null;
//   selectedFile: File | null = null;
//   successMessage: string | null = null; // Başarı mesajı için
//   selectedFileBase64: string | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     this.registerForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', Validators.required],
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       phoneNumber: ['', Validators.required],
//       profilePicture: [this.selectedFileBase64]
//     }, { 
//       validator: this.passwordMatchValidator 
//     });
//   }

//   passwordMatchValidator(form: FormGroup) {
//     return form.get('password')?.value === form.get('confirmPassword')?.value
//       ? null : { 'mismatch': true };
//   }

//   // onFileChange(event: any) {
//   //   this.selectedFile = event.target.files[0];
//   // }

//   // onFileChange(event: any) {
//   //   const file = event.target.files[0];
//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onload = (e: any) => {
//   //       this.selectedFileBase64 = e.target.result.split(',')[1];
//   //     };
//   //     reader.readAsDataURL(file);
//   //   }
//   // }


//   onFileChange(event: any) {
//     debugger;
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.selectedFileBase64 = e.target.result.split(',')[1];
//       };
//       reader.readAsDataURL(file);
//     } else {
//       this.selectedFileBase64 = null;
//     }
//   }

//   onSubmit() {
//     debugger;
//     if (this.registerForm.valid) {
//       const formData = new FormData();
//       formData.append('username', this.registerForm.get('username')?.value);
//       formData.append('password', this.registerForm.get('password')?.value);
//       formData.append('firstName', this.registerForm.get('firstName')?.value);
//       formData.append('lastName', this.registerForm.get('lastName')?.value);
//       formData.append('email', this.registerForm.get('email')?.value);
//       formData.append('phoneNumber', this.registerForm.get('phoneNumber')?.value);
//       if (this.selectedFile) {
//         formData.append('profilePicture', this.selectedFile);
//       }
//       // debugger;
//       this.authService.register(formData).subscribe({
//         // next: () => {
//         //   debugger;
//         //   this.successMessage = 'Registration successful. Redirecting to login...';
//         //   setTimeout(() => this.router.navigate(['/login'])); 
//         //   console.log(this.successMessage); // Başarı mesajını kontrol edin

//         // },
//         // error: err => 
//         //   {
//         //   debugger;
//         //   this.errorMessage = 'Registration failed. Please try again.'
//         //   console.log('Registration error:', err); // Hata mesajını konsola yazdır

//           // }
//           next: (response) => {
//             console.log('Registration response:', response); // API yanıtını konsola yazdırın
//             if (response && response.success) { // API yanıtında success alanı kontrol ediliyor
//               this.successMessage = 'Registration successful. Redirecting to login...';
//               console.log(this.successMessage); // Başarı mesajını kontrol edin
//               setTimeout(() => this.router.navigate(['/login']), 2000);
//             } else {
//               this.errorMessage = 'Registration failed. Please try again.';
//             }
//           },
//           error: err => {
//             console.log('Registration error:', err); // Hata mesajını konsola yazdır
//             this.errorMessage = 'Registration failed. Please try again.';
//           }

//           });
//     }
//   }
// }
//******************** */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  selectedFileBase64: string | null = null; // Base64 formatındaki dosya verisi
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      profilePicture: [this.selectedFileBase64] // Base64 veri buraya ekleniyor
    }, { 
      validator: this.passwordMatchValidator 
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFileBase64 = e.target.result.split(',')[1];
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedFileBase64 = null;
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('username', this.registerForm.get('username')?.value);
      formData.append('password', this.registerForm.get('password')?.value);
      formData.append('firstName', this.registerForm.get('firstName')?.value);
      formData.append('lastName', this.registerForm.get('lastName')?.value);
      formData.append('email', this.registerForm.get('email')?.value);
      formData.append('phoneNumber', this.registerForm.get('phoneNumber')?.value);
      if (this.selectedFileBase64) {
        formData.append('profilePicture', this.selectedFileBase64); // Base64 veriyi ekleyin
      }
      this.authService.register(formData).subscribe({
        next: (response) => {
          console.log('Registration response:', response);
          if (response && response.success) {
            this.successMessage = 'Registration successful. Redirecting to login...';
            console.log(this.successMessage);
            setTimeout(() => this.router.navigate(['/login']), 2000);
          } else {
            this.errorMessage = 'Registration failed. Please try again.';
          }
        },
        error: err => {
          console.log('Registration error:', err);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
    }
  }
}
