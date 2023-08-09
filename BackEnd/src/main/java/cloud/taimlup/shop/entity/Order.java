package cloud.taimlup.shop.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.deser.std.DateDeserializers;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table (name = "orderby")
@Data
@NoArgsConstructor
@Getter
@Setter
public class Order implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @OrderBy("id ASC")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "address_detail")
    private String address_detail;

    @Column(name = "note")
    private String note;

    @Column(name = "type") //COD || BANKING
    private String type;

    @Column(name = "date")
    private String date;

    @Column(name = "price")
    private String price;

    @Column(name = "voucher")
    private String voucher;

    @Column(name = "price_discount")
    private String price_discount;

    @Column(name = "status_ship")
    private int status_ship = 0;

    private Long[] list_id;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ProductOrder> products = new ArrayList<>();

    public Order(String name, String phone, String address, String address_detail, String note, String type, String date, String price, String voucher, String price_discount) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.address_detail = address_detail;
        this.note = note;
        this.type = type;
        this.date = date;
        this.price = price;
        this.voucher = voucher;
        this.price_discount = price_discount;
        this.status_ship = 0;
    }
}
