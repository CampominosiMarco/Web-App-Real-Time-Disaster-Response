package it.campominosi.springbackend.entity;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import it.campominosi.springbackend.classes.MarkerDataForClient;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "marker")
public class Marker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user = null;
    private boolean consent;
    private String description;
    private String icon;
    private String position;

    public Marker() {

    }

    public Marker(  @JsonProperty("consent") boolean consent,
                    @JsonProperty("description") String description,
                    @JsonProperty("icon") String icon,
                    @JsonProperty("position") String position) {

        this.consent = consent;
        this.description = description;
        this.icon = icon;
        this.position = position;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isConsent() {
        return consent;
    }

    public void setConsent(boolean consent) {
        this.consent = consent;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Object getPositionAsJson() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(this.position, Object.class);
        } catch (JsonProcessingException e) {
            System.out.println(e);
            return null;
        }
    }

    public Double getLatitude() {
        Object positionObject = getPositionAsJson();

        Double latitude = null;
        if (positionObject instanceof java.util.Map) {
            Object lat = ((java.util.Map<?, ?>) positionObject).get("lat");
            if (lat instanceof Double) {
                latitude = (Double) lat;
            } else if (lat instanceof Integer) {
                latitude = ((Integer) lat).doubleValue();
            }
        }
        return latitude;
    }

    public Double getLongitude() {
        Object positionObject = getPositionAsJson();

        Double longitude = null;
        if (positionObject instanceof java.util.Map) {
            Object lng = ((java.util.Map<?, ?>) positionObject).get("lng");
            if (lng instanceof Double) {
                longitude = (Double) lng;
            } else if (lng instanceof Integer) {
                longitude = ((Integer) lng).doubleValue();
            }
        }
        return longitude;
    }

    @Override
    public String toString() {
        return "[" + id + "] - UserId: " + user + " - Consent: " + isConsent() + " - Icon: [" + icon + "] - Position: " + position + " - Description: " + description;
    }

    public MarkerDataForClient toMarkerData() {
        MarkerDataForClient markerData = new MarkerDataForClient();
        markerData.setId(this.getId());
        markerData.setUserName(this.getUser().getName());
        markerData.setDescription(this.getDescription());
        markerData.setIcon(this.getIcon());
        markerData.setPosition(parsePosition(this.getPosition()));

        if (this.isConsent()) {
            markerData.setUserMobile(this.getUser().getMobile());
            markerData.setUserEmail(this.getUser().getEmail());
        }

        return markerData;
    }

    private Map<String, Double> parsePosition(String position) {
        Map<String, Double> parsedPosition = new HashMap<>();
        try {
            JSONObject jsonObject = new JSONObject(position);
            double lat = jsonObject.getDouble("lat");
            double lng = jsonObject.getDouble("lng");

            parsedPosition.put("lat", lat);
            parsedPosition.put("lng", lng);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return parsedPosition;
    }
}
