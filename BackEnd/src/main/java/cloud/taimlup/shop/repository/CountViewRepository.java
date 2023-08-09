package cloud.taimlup.shop.repository;

import cloud.taimlup.shop.entity.CountView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountViewRepository extends JpaRepository<CountView, Long> {
}
