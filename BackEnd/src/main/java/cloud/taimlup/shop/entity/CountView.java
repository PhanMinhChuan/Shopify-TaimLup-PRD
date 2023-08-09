package cloud.taimlup.shop.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "countview")
@Data
@NoArgsConstructor
@Getter
@Setter
public class CountView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "count_view_web")
    private int count_view_web;
}
