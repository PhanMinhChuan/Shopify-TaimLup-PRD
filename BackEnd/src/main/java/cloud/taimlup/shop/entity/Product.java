package cloud.taimlup.shop.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table (name = "product")
@Data
@NoArgsConstructor
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "type")
    private String type;

    @Column(name = "type_detail")
    private String type_detail;

    @Column(name = "name", length = 255)
    private String name;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonManagedReference
    @OrderBy("id ASC")
    private List<Image> images = new ArrayList<>();

    @Column(name = "size")
    private String size;

    @Column(name = "size_model")
    private String size_model;

    @Column(name = "size_length")
    private String size_length;

    @Column(name = "size_waist")
    private String size_waist;

    @Column(name = "size_leg")
    private String size_leg;

    @Column(name = "condition_percent")
    private String condition_percent;

    @Column(name = "trademark")
    private String trademark;

    @Column(name = "price")
    private String price;

    @Column(name= "wait_buy")
    private int wait_buy;

    @Column(name= "reduced_price")
    private String reduced_price;

    public Product(String type, String type_detail, String name, String size, String size_model, String size_length, String size_waist, String size_leg, String condition_percent, String trademark, String price) {
        this.type = type;
        this.type_detail = type_detail;
        this.name = name;
        this.size = size;
        this.size_model = size_model;
        this.size_length = size_length;
        this.size_waist = size_waist;
        this.size_leg = size_leg;
        this.condition_percent = condition_percent;
        this.trademark = trademark;
        this.price = price;
        this.wait_buy = 0;
    }

    public Product(String type, String type_detail, String name, String size, String size_model, String size_length, String size_waist, String size_leg, String condition_percent, String trademark, String price, String reduced_price) {
        this.type = type;
        this.type_detail = type_detail;
        this.name = name;
        this.size = size;
        this.size_model = size_model;
        this.size_length = size_length;
        this.size_waist = size_waist;
        this.size_leg = size_leg;
        this.condition_percent = condition_percent;
        this.trademark = trademark;
        this.price = price;
        this.wait_buy = 0;
        this.reduced_price = reduced_price;
    }
}
