package com.tesela.modules.user.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Un @Document es el equivalente a una fila de SQL, y la coleccion "users" a la tabla.
 * Cada usuario se guarda como un documento JSON (BSON) dentro de la coleccion.
 */
@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {

	/** Mongo genera un ObjectId automaticamente si es null. Se guarda en el campo "_id". */
	@Id
	private String id;

	/** unique = true crea un indice unico: Mongo rechazara un segundo usuario con el mismo correo. */
	@Indexed(unique = true)
	private String correo;

	/** Aqui va el HASH de la contrasenia (BCrypt), nunca el texto plano. */
	private String contrasenia;

	private String nombre;
	private String apellidos;
	private String telefono;

	@Indexed(unique = true)
	private String dni;

	private Direccion direccion;

}
