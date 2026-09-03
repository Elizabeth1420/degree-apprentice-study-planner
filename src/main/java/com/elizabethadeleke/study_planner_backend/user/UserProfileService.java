package com.elizabethadeleke.study_planner_backend.user;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserProfileService {

    private final UserProfileRepository repository;

    public UserProfileService(UserProfileRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public UserProfile createOrUpdateProfile(UUID userId, String email) {
        UserProfile profile = repository
                .findById(userId)
                .orElseGet(() -> new UserProfile(userId, email));

        profile.setEmail(email);
        return repository.save(profile);
    }
}