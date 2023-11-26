package it.campominosi.springbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.campominosi.springbackend.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByName(String name);

    List<User> findByEmail(String email);

    List<User> findByNameOrEmail(String name, String email);
}

