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
import org.springframework.test.context.ActiveProfiles;

import br.com.goldenawards.Constants;
import br.com.goldenawards.dto.WinnersByIntervalSummary;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ActiveProfiles("test")
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
    public void shouldGetResponseWithData() {
    	ResponseEntity<WinnersByIntervalSummary> response = restTemplate
                .exchange(PROJECTION_URL, HttpMethod.GET, null, WinnersByIntervalSummary.class);
        
    	var result = response.getBody();
    	
    	assertNotNull(result);
    	assertNotNull(result.min());
    	assertNotNull(result.max());
    }
    
    @Test
    public void shouldGetResponseWithCorrectData() {
    	ResponseEntity<WinnersByIntervalSummary> response = restTemplate
                .exchange(PROJECTION_URL, HttpMethod.GET, null, WinnersByIntervalSummary.class);
        
    	var result = response.getBody();
    	
    	assertEquals(Constants.EXPECTED_MIN_PRODUCER, result.min().get(0).producer());
    	assertEquals(Constants.EXPECTED_MIN_INTERVAL, result.min().get(0).interval());
    	assertEquals(Constants.EXPECTED_MIN_PREVIOUS_WIN, result.min().get(0).previousWin());
    	assertEquals(Constants.EXPECTED_MIN_FOLLOWING_WIN, result.min().get(0).followingWin());
    	
    	assertEquals(Constants.EXPECTED_MAX_PRODUCER, result.max().get(0).producer());
    	assertEquals(Constants.EXPECTED_MAX_INTERVAL, result.max().get(0).interval());
    	assertEquals(Constants.EXPECTED_MAX_PREVIOUS_WIN, result.max().get(0).previousWin());
    	assertEquals(Constants.EXPECTED_MAX_FOLLOWING_WIN, result.max().get(0).followingWin());
    }
    
}
