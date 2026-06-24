package org.example.kortexdev.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class PingScheduler {

    @Value("${server.url}")
    private String url;

    private final RestTemplate restTemplate = new RestTemplate();

    @Scheduled(fixedRate = 600000)
    public void pingSelf() {
        try {
            String url = this.url + "/ping";
            restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
