package it.campominosi.springbackend.marker;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import it.campominosi.springbackend.classes.MarkerDataForClient;
import it.campominosi.springbackend.entity.Marker;
import it.campominosi.springbackend.entity.User;
import it.campominosi.springbackend.repository.MarkerRepository;
import it.campominosi.springbackend.repository.UserRepository;

@RestController
@RequestMapping("/markers")
public class MarkerController {

    private final MarkerRepository markerRepository;
    private final UserRepository userRepository;

    public MarkerController(MarkerRepository markerRepository, UserRepository userRepository) {
        this.markerRepository = markerRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addMarker(@RequestBody String requestBody) {
        System.out.print(".:.    Marker POST ADD Request Received: ");
        
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> response = new HashMap<>();

        try {
            Map<String, Object> requestData = objectMapper.readValue(requestBody, new TypeReference<Map<String,Object>>() {});

            Long userId = Long.parseLong(requestData.get("user_id").toString());
            User userInDB = userRepository.findById(userId).orElse(null);
            if (userInDB == null) {
                response.put("error", "User Not Found!");
                System.out.println(response.get("error"));
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            requestData.remove("user_id");
            Marker markerDataFromRequestBody = objectMapper.convertValue(requestData, Marker.class);
            markerDataFromRequestBody.setUser(userInDB);

            Marker savedMarker = markerRepository.save(markerDataFromRequestBody);
            response.put("marker_id", savedMarker.getId());
            System.out.println("Marker added: " + response.get("marker_id"));
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            response.put("error", e);
            System.out.println(response.get("error"));
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<MarkerDataForClient>> getAllMarkersAsJson() {
        System.out.println(".:.    Markers GET ALL Request Received    .:.");
        List<Marker> markers = markerRepository.findAll();
        List<MarkerDataForClient> markersData = markers.stream()
                .map(Marker::toMarkerData) // Aggiungi il metodo toMarkerData in Marker
                .collect(Collectors.toList());
        return ResponseEntity.ok(markersData);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<MarkerDataForClient> getMarkerByIdAsJson(@PathVariable("id") Long id) {
        System.out.println(".:.    Marker GET ID Request Received    .:.");
        if (id != null){
            Optional<Marker> marker = markerRepository.findById(id);
            return marker.map(Marker::toMarkerData)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/user/{user_id}")
    public ResponseEntity<List<MarkerDataForClient>> getMarkerByUserAsJson(@PathVariable("user_id") Long id) {
        System.out.println(".:.    Markers GET USER ID Request Received    .:.");
        List<Marker> markers = markerRepository.findAllByUserId(id);
        List<MarkerDataForClient> markersData = markers.stream()
                .map(Marker::toMarkerData)
                .collect(Collectors.toList());
        return ResponseEntity.ok(markersData);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteMarkerById(@PathVariable("id") Long id) {
        System.out.print(".:.    Marker DELETE ID Request Received: ");

        Map<String, Object> response = new HashMap<>();
        if (id != null && markerRepository.existsById(id)) {
            markerRepository.deleteById(id);

            response.put("deleted_marker_id", id);
            System.out.println("Marker deleted: " + response.get("deleted_marker_id"));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.put("error", "Marker not Found");
            System.out.println(response.get("error"));
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateMarkerDescription(@PathVariable("id") Long id, @RequestBody String newDescription) {
        System.out.print(".:.    Marker PUT ID Request Received: ");

        Map<String, Object> response = new HashMap<>();
        if (id != null && newDescription != null && markerRepository.existsById(id)) {
            Optional<Marker> optionalMarker = markerRepository.findById(id);
            Marker marker = optionalMarker.get();

            marker.setDescription(newDescription);
            markerRepository.save(marker);

            response.put("updated_marker_id", id);
            System.out.println("Marker updated: " + response.get("updated_marker_id"));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.put("error", "Marker not found or Bad Request");
            System.out.println(response.get("error"));
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}