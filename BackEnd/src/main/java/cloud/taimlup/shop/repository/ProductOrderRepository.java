package cloud.taimlup.shop.repository;

import cloud.taimlup.shop.entity.Order;
import cloud.taimlup.shop.entity.Product;
import cloud.taimlup.shop.entity.ProductOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductOrderRepository extends JpaRepository<ProductOrder, Long> {
}
