package br.com.goldenawards.resource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import br.com.goldenawards.dto.WinnersByIntervalSummary;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class MovieResourceTest {

    private static final String PROJECTION_URL = "/movies?projection=max-min-win-interval-for-producers";
    
	private @Autowired TestRestTemplate restTemplate;
    
    @Test
    public void shouldGetOkResponse() {
    	ResponseEntity<WinnersByIntervalSummary> response = restTemplate
                .exchange(PROJECTION_URL, HttpMethod.GET, null, WinnersByIntervalSummary.class);
        
        assertEquals(response.getStatusCode(), HttpStatus.OK);
    }
    
    @Test
    public void shouldGetOkResponseWithData() {
    	ResponseEntity<WinnersByIntervalSummary> response = restTemplate
                .exchange(PROJECTION_URL, HttpMethod.GET, null, WinnersByIntervalSummary.class);
        
    	var result = response.getBody();
    	
    	assertNotNull(result);
    	assertNotNull(result.min());
    	assertNotNull(result.max());
    }
    
}
