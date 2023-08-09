package cloud.taimlup.shop.repository;

import cloud.taimlup.shop.entity.Order;
import cloud.taimlup.shop.entity.Product;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

     @Modifying
     @Query(value = "SELECT * FROM orderby WHERE status_ship = 0 ORDER BY ID DESC", nativeQuery = true)
     List<Order> findAllByOrderByIdDesc();

     @Modifying
     @Query(value = "SELECT * FROM orderby WHERE status_ship = 1 ORDER BY ID DESC", nativeQuery = true)
     List<Order> findAllByOrderByIdDescTrash();
}
