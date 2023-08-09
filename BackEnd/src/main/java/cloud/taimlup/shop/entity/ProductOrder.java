package cloud.taimlup.shop.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table (name = "productorder")
@Data
@NoArgsConstructor
@Getter
@Setter
public class ProductOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "image")
    private String image;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    @JsonBackReference
    private Order order;


    @Column(name = "price")
    private String price;

    public ProductOrder(String name, String image, Order order, String price) {
        this.name = name;
        this.image = image;
        this.order = order;
        this.price = price;
    }
}
