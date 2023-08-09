package cloud.taimlup.shop.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table (name = "discount")
@Data
@NoArgsConstructor
@Getter
@Setter
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "start_date")
    private Date start_date;

    @Column(name = "end_date")
    private Date end_date;

    @Column(name = "code")
    private String code;

    @Column(name = "type")
    private String type;

    @Column(name = "discount_price")
    private String discount_price;

    @Column(name = "discount_percent")
    private String discount_percent;

    public Discount(Date start_date, Date end_date, String code, String type, String discount_price, String discount_percent) {
        this.start_date = start_date;
        this.end_date = end_date;
        this.code = code;
        this.type = type;
        this.discount_price = discount_price;
        this.discount_percent = discount_percent;
    }
}
