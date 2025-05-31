import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(email: string, password: string) {
    // chamar o service http
    /**
     * this.httpService.post('/auth/login', { email, password })
     * .subscribe((response: any) => {
     *  if (!response.success) {
     *    return;
     *  }
     *
     *  guardar o token
     *  this.setToken(response.token);
     *
     * });
     */
  }

  signup(name: string, email: string, password: string) {
    // chamar o service http
    /**
     * this.httpService.post('/auth/signup', { name, email, password })
     * .subscribe((response: any) => {
     *  if (!response.success) {
     *    return;
     *  }
     * processp de autenticacao vai ser enviado pelo email, por la o usuario vai confirmar
     * });
     */
  }

  logout() {
    this.setToken('');
    localStorage.removeItem('token');
    // this._router.navigate(['/']);
  }

  isAuthenticated() {
    return this.getToken() !== '';
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
}
