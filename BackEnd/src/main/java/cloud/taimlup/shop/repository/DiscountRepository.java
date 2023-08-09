package cloud.taimlup.shop.repository;

import cloud.taimlup.shop.entity.Discount;
import cloud.taimlup.shop.entity.Order;
import cloud.taimlup.shop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Long> {
    @Query(value = "SELECT * FROM discount WHERE code = ?1 limit 1", nativeQuery = true)
    Optional<Discount> findByCode(String discount);

    List<Discount> findAllByOrderByIdDesc();
}
