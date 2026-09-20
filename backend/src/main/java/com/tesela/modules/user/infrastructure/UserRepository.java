package com.tesela.modules.user.infrastructure;

import com.tesela.modules.user.domain.User;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring genera la implementacion. Ya trae save, findById, findAll, deleteById...
 * Los metodos findBy... se traducen solos a consultas Mongo: findByCorreo => { correo: ? }
 */
public interface UserRepository extends MongoRepository<User, String> {

	Optional<User> findByCorreo(String correo);

	Optional<User> findByDni(String dni);

}
