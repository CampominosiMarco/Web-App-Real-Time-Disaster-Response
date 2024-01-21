package it.campominosi.springbackend.registration;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
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
@RequestMapping("/registration")
public class RegistrationController {

    private final UserRepository userRepository;

    public RegistrationController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<Object> handleRegistration(@RequestBody String requestBody) {
        System.out.print(".:.    Registration POST Request Received: ");

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> response = new HashMap<>();

        try {
            User userData = objectMapper.readValue(requestBody, User.class);

            if (userData == null) {
                response.put("error", "User Mapper error");
                System.out.println(response.get("error"));
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            User savedUser = userRepository.save(userData);
            response.put("user_id", savedUser.getId());
            System.out.println("Registration completed for user: " + response.get("user_id"));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (DataIntegrityViolationException e1) {

            String errorMessageSQL = "";
            Throwable rootCause = e1.getRootCause();
            if (rootCause instanceof SQLException) {
                SQLException sqlException = (SQLException) e1.getRootCause();
                if (sqlException != null){
                    errorMessageSQL = sqlException.getMessage();
                }
            }

            response.put("error", errorMessageSQL);
            System.out.println(response.get("error"));
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            
        } catch (Exception e2) {
            response.put("error", e2);
            System.out.println(response.get("error"));
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}