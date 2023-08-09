package cloud.taimlup.shop.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import java.util.List;

@Entity
@Table (name = "image")
@Data
@NoArgsConstructor
@Getter
@Setter
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    @OrderBy("product_id DESC")
    @JsonBackReference
    private Product product;

    @Column(name = "path")
    private String path;

    public Image(Product product, String path) {
        this.product = product;
        this.path = path;
    }
}
