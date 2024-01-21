package it.campominosi.springbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.campominosi.springbackend.entity.Marker;

@Repository
public interface MarkerRepository extends JpaRepository<Marker, Long> {

    List<Marker> findAllByUserId(Long userId);

    List<Marker> findAllByDescriptionContaining(String keyword);

    List<Marker> findAllByPosition(String position);

    List<Marker> findAllByIcon(String icon);
}
