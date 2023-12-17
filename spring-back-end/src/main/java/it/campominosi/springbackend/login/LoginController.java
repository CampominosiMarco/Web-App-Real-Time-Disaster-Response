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

import at.favre.lib.crypto.bcrypt.BCrypt;
import at.favre.lib.crypto.bcrypt.BCrypt.Verifyer;
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
            User userDataFromRequestBody = objectMapper.readValue(requestBody, User.class);
            System.out.println("****************************    Object Mapper     ****************************");
            //System.out.println(userData);

            Optional<User> dbUserOptional = userRepository.findByName(userDataFromRequestBody.getName());

            if (dbUserOptional.isPresent()) {

                User user = dbUserOptional.get();
                String hashedPasswordFromDB = user.getPassword();

                Verifyer verifyer = BCrypt.verifyer();
                BCrypt.Result isMatch = verifyer.verify(userDataFromRequestBody.getPassword().getBytes(), hashedPasswordFromDB.getBytes());

                if (isMatch.verified) {
              //      response.put("status", "OK");
                    response.put("user_id", user.getId());
                    response.put("user_name", user.getName());
                    System.out.println("Access for user: " + response.get("user_id"));
                    return new ResponseEntity<>(response, HttpStatus.OK);
                } else {
            //        response.put("status", "KO");
                    response.put("error", "Invalid credentials!");
                    System.out.println(response.get("error"));
                    return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
                }

            } else {
             //   response.put("status", "KO");
                response.put("error", "User not found!");
                System.out.println(response.get("error"));
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.err.println("****************************    User Mapper Exception     ****************************\n" + e);
        //    response.put("status", "User Mapper Exception");
            response.put("error", e);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}