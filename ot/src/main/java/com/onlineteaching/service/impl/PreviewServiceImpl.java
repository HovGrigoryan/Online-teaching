package com.onlineteaching.service.impl;

import com.onlineteaching.model.*;
import com.onlineteaching.repository.*;
import com.onlineteaching.service.PreviewService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j

public class PreviewServiceImpl implements PreviewService {

    private final UserRepository userRepository;
    private final PreviewRepository previewRepository;

    public PreviewServiceImpl(UserRepository userRepository, PreviewRepository previewRepository) {
        this.userRepository = userRepository;
        this.previewRepository = previewRepository;
    }


    @Override
    public List<Preview> previews() {
        return previewRepository.findTop3ByOrderByRateDesc();
    }
}
