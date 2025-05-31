import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SignupComponent } from './signup.component';
import { AuthService } from 'src/app/service/auth.service';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spies
    const authSpy = jasmine.createSpyObj('AuthService', ['signup']);
    const router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SignupComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.form.get('name')?.value).toBe('');
    expect(component.form.get('email')?.value).toBe('');
    expect(component.form.get('password')?.value).toBe('');
  });

  it('should mark form as invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should validate form fields as required', () => {
    const nameControl = component.form.get('name');
    const emailControl = component.form.get('email');
    const passwordControl = component.form.get('password');

    nameControl?.setValue('');
    emailControl?.setValue('');
    passwordControl?.setValue('');

    expect(nameControl?.hasError('required')).toBeTruthy();
    expect(emailControl?.hasError('required')).toBeTruthy();
    expect(passwordControl?.hasError('required')).toBeTruthy();
  });

  it('should call authService.signup when form is valid', () => {
    // Arrange
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
    
    component.form.setValue(testData);
    spyOn(authServiceSpy, 'signup').and.callThrough();

    // Act
    component.ngSubmit();

    // Assert
    expect(authServiceSpy.signup).toHaveBeenCalledWith(
      testData.name,
      testData.email,
      testData.password
    );
  });

  it('should not call authService.signup when form is invalid', () => {
    // Arrange
    component.form.setValue({
      name: '',
      email: '',
      password: ''
    });

    // Act
    component.ngSubmit();

    // Assert
    expect(authServiceSpy.signup).not.toHaveBeenCalled();
  });

  it('should set loading to false after signup attempt', () => {
    // Arrange
    component.form.setValue({
      name: 'Test',
      email: 'test@example.com',
      password: 'password123'
    });
    spyOn(authServiceSpy, 'signup').and.callThrough();

    // Act
    component.ngSubmit();

    // Assert
    expect(component.loading).toBeFalse();
  });

  it('should handle signup error', () => {
    // Arrange
    component.form.setValue({
      name: 'Test',
      email: 'test@example.com',
      password: 'password123'
    });
    
    // Mock the signup method to throw an error
    spyOn(authServiceSpy, 'signup').and.throwError('Signup failed');
    spyOn(console, 'error');

    // Act
    component.ngSubmit();

    // Assert
    expect(component.loading).toBeFalse();
    expect(console.error).toHaveBeenCalled();
  });

  it('should navigate to login page', () => {
    // Act
    component.redirectToLogin();

    // Assert
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
