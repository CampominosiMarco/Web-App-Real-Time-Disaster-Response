package it.campominosi.springbackend.registration.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.campominosi.springbackend.registration.entity.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByName(String name);

    List<User> findByEmail(String email);

    List<User> findByNameOrEmail(String name, String email);

}

