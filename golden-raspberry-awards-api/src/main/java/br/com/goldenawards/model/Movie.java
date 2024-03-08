package br.com.goldenawards.model;

import java.util.List;

import br.com.goldenawards.dto.WinnerProducerPerYear;
import jakarta.persistence.Column;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.NamedNativeQuery;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.Table;

@SqlResultSetMapping(
        name = "findWinningProducersMapping",
        classes = {
                @ConstructorResult(
                        targetClass = WinnerProducerPerYear.class,
                        columns = {
                                @ColumnResult(name = "producerName", type = String.class),
                                @ColumnResult(name = "movieYear", type = Integer.class)
                        }
                )
        }
)
@NamedNativeQuery(
        name = "Movie.findWinningProducers",
        query = """
    			SELECT movie_year movieYear, producer.name producerName FROM movie movie
    			INNER JOIN movie_producer ON movie_producer.movie_id = movie.movie_id
    			INNER JOIN producer ON producer.producer_id = movie_producer.producer_id
    			WHERE movie.winner = true;
    			""",
        resultSetMapping = "findWinningProducersMapping"
)

@Entity
@Table(name = "movie")
public class Movie {
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "movie_id")
	private Long id;

	private Integer movieYear;
	private String title;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "movie_studio", 
		joinColumns = @JoinColumn(name = "movie_id", foreignKey = @ForeignKey(name = "FK_movie_studio_movie_id")), 
		inverseJoinColumns = @JoinColumn(name = "studio_id", foreignKey = @ForeignKey(name = "FK_movie_studio_studio_id")))
	private List<Studio> studios;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "movie_producer", 
		joinColumns = @JoinColumn(name = "movie_id", foreignKey = @ForeignKey(name = "FK_movie_producer_movie_id")), 
			inverseJoinColumns = @JoinColumn(name = "producer_id", foreignKey = @ForeignKey(name = "FK_movie_producer_producer_id")))
	private List<Producer> producers;
	
	public Movie() {
		super();
	}
	
	public Movie(String title, Integer movieYear, String winner) {
		this.title = title;
		this.movieYear = movieYear;
		this.winner = winner != null && winner.equals("yes") ? Boolean.TRUE : Boolean.FALSE;
	}
	
	public Movie(String title, Integer movieYear, String winner, List<Producer> producers, List<Studio> studios) {
		this.title = title;
		this.movieYear = movieYear;
		this.winner = winner != null && winner.equals("yes") ? Boolean.TRUE : Boolean.FALSE;
		this.producers = producers;
		this.studios = studios;
	}

	private Boolean winner;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getMovieYear() {
		return movieYear;
	}

	public void setMovieYear(Integer movieYear) {
		this.movieYear = movieYear;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<Studio> getStudios() {
		return studios;
	}

	public void setStudios(List<Studio> studios) {
		this.studios = studios;
	}

	public List<Producer> getProducers() {
		return producers;
	}

	public void setProducers(List<Producer> producers) {
		this.producers = producers;
	}

	public Boolean getWinner() {
		return winner;
	}

	public void setWinner(Boolean winner) {
		this.winner = winner;
	}

	@Override
	public String toString() {
		return "Movie [id=" + id + ", movieYear=" + movieYear + ", title=" + title + ", studios=" + studios
				+ ", producers=" + producers + ", winner=" + winner + "]";
	}
	
}
