package it.campominosi.springbackend.login;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import it.campominosi.springbackend.entity.User;
import it.campominosi.springbackend.repository.UserRepository;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final UserRepository userRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<Object> handleLogin(@RequestBody String requestBody) {
        System.out.println("\n****************************    Request Received     ****************************");
        //System.out.println(requestBody);

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> response = new HashMap<>();

        try {
            User userData = objectMapper.readValue(requestBody, User.class);
            System.out.println("****************************    Object Mapper     ****************************");
            //System.out.println(userData);

            Optional<User> userOptional = userRepository.findByName(userData.getName());

            if (userOptional.isPresent()) {
                response.put("status", "OK");
                response.put("user", userOptional);
                return new ResponseEntity<>(response, HttpStatus.OK);



//TODO Manca da verificare la password con l'encryprion di angular


            } else {
                response.put("status", "KO");
                response.put("error", "User not found!");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.err.println("****************************    User Mapper Exception     ****************************\n" + e);
            response.put("status", "User Mapper Exception");
            response.put("error", e);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}