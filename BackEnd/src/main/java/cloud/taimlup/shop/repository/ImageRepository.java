package cloud.taimlup.shop.repository;

import cloud.taimlup.shop.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    @Modifying
    @Query(value = "DELETE FROM image WHERE product_id = ?1", nativeQuery = true)
    void deleteByProductId(long id);

}
