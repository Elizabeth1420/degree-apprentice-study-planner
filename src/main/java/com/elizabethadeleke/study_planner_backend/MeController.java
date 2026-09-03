package com.elizabethadeleke.study_planner_backend;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import com.elizabethadeleke.study_planner_backend.user.UserProfile;
import com.elizabethadeleke.study_planner_backend.user.UserProfileService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MeController {

    private final UserProfileService userProfileService;

    public MeController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping("/api/me")
    public Map<String, Object> me(@AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(jwt.getSubject());
        String email = jwt.getClaimAsString("email");

        UserProfile profile = userProfileService.createOrUpdateProfile(userId, email);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("userId", profile.getUserId());
        response.put("email", profile.getEmail());
        response.put("role", jwt.getClaimAsString("role"));
        response.put("issuer", jwt.getIssuer().toString());
        return response;
    }
}