package it.campominosi.springbackend.marker;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

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
        System.out.println("\n****************************    Request Received     ****************************");
        System.out.println(requestBody);
        
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> response = new HashMap<>();

        try {


            // Parsing the JSON string to a Map
            Map<String, Object> requestData = objectMapper.readValue(requestBody, new TypeReference<Map<String,Object>>() {});
            // Extracting user_id from the request body
            Long userId = Long.parseLong(requestData.get("user_id").toString());



            User user = userRepository.findById(userId).orElse(null);
         /*   if (user == null) {
                return ResponseEntity.status(404).body("User not found");
            }*/



            Marker markerDataFromRequestBody = objectMapper.convertValue(requestData, Marker.class);

            markerDataFromRequestBody.setUser(user); // Associating the user with the marker

            System.out.println("****************************    Object Mapper     ****************************");
            System.out.println(markerDataFromRequestBody);

            Marker savedMarker = markerRepository.save(markerDataFromRequestBody);

            response.put("marker_id", savedMarker.getId());
            System.out.println("Marker added: " + response.get("marker_id"));
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            System.err.println("****************************    Marker Exception     ****************************\n" + e);
            response.put("error", e);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }


 



















}
