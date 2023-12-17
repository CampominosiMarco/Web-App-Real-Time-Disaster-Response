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
        System.out.println("\n****************************    Request Received     ****************************");
        //System.out.println(requestBody);

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> response = new HashMap<>();
        User userData = null;

        try {
            userData = objectMapper.readValue(requestBody, User.class);
            System.out.println("****************************    Object Mapper     ****************************");
            //System.out.println(userData);
        } catch (Exception e) {
            System.err.println("****************************    User Mapper Exception     ****************************\n" + e);
        }

        System.out.println("****************************    Saving in Database...     ****************************");
        try {
            User savedUser = userRepository.save(userData);
            System.out.println("****************************    Registration COMPLETED: " + savedUser.getId() + "     ****************************");

            //response.put("status", "OK");
            response.put("user_id", savedUser.getId());
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (DataIntegrityViolationException e1) {
            System.out.println("****************************    Registration FAILED:     ****************************\n" + e1);

            String errorMessageSQL = "";
            Throwable rootCause = e1.getRootCause();
            if (rootCause instanceof SQLException) {
                SQLException sqlException = (SQLException) e1.getRootCause();
                if (sqlException != null){
                    errorMessageSQL = sqlException.getMessage();
                }
            }

            //response.put("status", "ERROR");
            response.put("error", errorMessageSQL);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            
        } catch (Exception e2) {
            System.err.println("****************************    Registration FAILED:     ****************************\n" + e2);
            
            //response.put("status", "ERROR");
            response.put("error", e2);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}