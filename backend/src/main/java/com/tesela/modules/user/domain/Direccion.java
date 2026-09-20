package com.tesela.modules.user.domain;

/**
 * Direccion EMBEBIDA dentro del usuario: no tiene coleccion propia ni id.
 * En Mongo se guarda como un subdocumento: { direccion: { calle: "...", ciudad: "..." } }
 * En SQL esto seria una tabla "direccion" con una FK al usuario.
 */
public record Direccion(
		String calle,
		String ciudad,
		String codigoPostal,
		String pais) {
}
