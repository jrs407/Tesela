/** Lo que enviamos al backend al hacer login. Mismos nombres que el modelo User de Java. */
export interface LoginRequest {
  correo: string;
  contrasenia: string;
}

/** Datos del usuario que nos devuelve el backend. Nunca incluye la contrasenia. */
export interface UsuarioSesion {
  id: string;
  correo: string;
  nombre: string;
  apellidos: string;
}

export interface LoginResponse {
  token: string;
  usuario: UsuarioSesion;
}
