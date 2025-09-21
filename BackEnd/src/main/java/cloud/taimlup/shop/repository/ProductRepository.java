package cloud.taimlup.shop.repository;

import cloud.taimlup.shop.entity.Order;
import cloud.taimlup.shop.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAllByOrderByIdDesc();

    @Query(value = "SELECT * FROM product ORDER BY RAND()", nativeQuery = true)
    List<Product> findAllRandom(Pageable pageable);
    
    @Query(value = "SELECT * FROM product WHERE attribute = 'used' ORDER BY RAND()", nativeQuery = true)
    List<Product> findAllSecondHandRandom(Pageable pageable);
    
    @Query(value = "SELECT * FROM product WHERE attribute = 'merchandise' ORDER BY RAND()", nativeQuery = true)
    List<Product> findAllMerchandiseRandom(Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE wait_buy = 0 ORDER BY ID DESC", nativeQuery = true)
    List<Product> findAllByWaitBuy(Pageable pageable);

    @Modifying
    @Query(value = "SELECT * FROM product WHERE wait_buy = 1 ORDER BY ID DESC", nativeQuery = true)
    List<Product> findAllByWaitBuyTrash();

    @Query(value = "SELECT * FROM product WHERE type = ?1 ORDER BY RAND()", nativeQuery = true)
    List<Product> findAllByType(String type, Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE size LIKE %?1% ORDER BY ID DESC", nativeQuery = true)
    List<Product> findAllWithSize(String size, Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE type = ?1 AND size LIKE %?2% ORDER BY ID DESC", nativeQuery = true)
    List<Product> findAllByTypeWithSize(String type, String size, Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE type_detail = ?1 ORDER BY ID DESC", nativeQuery = true)
    List<Product> findAllByTypeDetail(String type_detail, Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE type_detail = ?1 AND size LIKE %?2% ORDER BY ID DESC", nativeQuery = true)
    List<Product> findAllByTypeDetailWithSize(String type_detail, String size, Pageable pageable);

    @Modifying
    @Query(value = "SELECT * FROM product WHERE name LIKE %?1% ORDER BY ID DESC LIMIT 10", nativeQuery = true)
    List<Product> findAllByName(String name);

    @Query(value = "SELECT * FROM product ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) DESC", nativeQuery = true)
    List<Product> findAllOrderByDESC(Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE size LIKE %?1% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) DESC", nativeQuery = true)
    List<Product> findAllOrderByDESCWithSize(Pageable pageable, String size);

    @Query(value = "SELECT * FROM product WHERE type = ?1 ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) DESC", nativeQuery = true)
    List<Product> findAllByTypeOrderByDESC(Pageable pageable, String type);

    @Query(value = "SELECT * FROM product WHERE type = ?1 AND size LIKE %?2% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) DESC", nativeQuery = true)
    List<Product> findAllByTypeOrderByDESCWithSize(Pageable pageable, String type, String size);

    @Query(value = "SELECT * FROM product WHERE type_detail = ?1 ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) DESC", nativeQuery = true)
    List<Product> findAllByTypeDetailOrderByDESC(Pageable pageable, String type_detail);

    @Query(value = "SELECT * FROM product WHERE type_detail = ?1 AND size LIKE %?2% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) DESC", nativeQuery = true)
    List<Product> findAllByTypeDetailOrderByDESCWithSize(Pageable pageable, String type_detail, String size);

    @Query(value = "SELECT * FROM product ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) ASC", nativeQuery = true)
    List<Product> findAllOrderByASC(Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE size LIKE %?1% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) ASC", nativeQuery = true)
    List<Product> findAllOrderByASCWithSize(Pageable pageable, String size);

    @Query(value = "SELECT * FROM product WHERE type = ?1 ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) ASC", nativeQuery = true)
    List<Product> findAllByTypeOrderByASC(Pageable pageable, String type);

    @Query(value = "SELECT * FROM product WHERE type = ?1 AND size LIKE %?2% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) ASC", nativeQuery = true)
    List<Product> findAllByTypeOrderByASCWithSize(Pageable pageable, String type, String size);

    @Query(value = "SELECT * FROM product WHERE type_detail = ?1 ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) ASC", nativeQuery = true)
    List<Product> findAllByTypeDetailOrderByASC(Pageable pageable, String type_detail);

    @Query(value = "SELECT * FROM product WHERE type_detail = ?1 AND size LIKE %?2% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) ASC", nativeQuery = true)
    List<Product> findAllByTypeDetailOrderByASCWithSize(Pageable pageable, String type_detail, String size);

    @Query(value = "SELECT id FROM product WHERE id = (SELECT MAX(id) FROM product);", nativeQuery = true)
    Long findIdMax();

    @Query(value = "(SELECT * FROM product WHERE name LIKE %?1% ORDER BY id DESC LIMIT 10000)" +
            "UNION" +
            "(SELECT * FROM product WHERE name NOT LIKE %?1% ORDER BY id DESC LIMIT 10000)", nativeQuery = true)
    List<Product> findAllByNameButAllItem(String name, Pageable pageable);

    @Query(value = "(SELECT * FROM product WHERE name LIKE %?1% AND type_detail = ?2 AND size LIKE %?3% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) DESC LIMIT 10000)"
                   + "UNION "
                   + "(SELECT * FROM product WHERE name NOT LIKE %?1% AND type_detail = ?2 AND size LIKE %?3% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) DESC LIMIT 10000)", nativeQuery = true)
    List<Product> findAllByNameTypeDetailSizeDESC(String name, String type_detail, String size, Pageable pageable);

    @Query(value = "(SELECT * FROM product WHERE name LIKE %?1% AND type_detail = ?2 ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) DESC LIMIT 10000)"
            + "UNION "
            + "(SELECT * FROM product WHERE name NOT LIKE %?1% AND type_detail = ?2 ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) DESC LIMIT 10000)", nativeQuery = true)
    List<Product> findAllByNameTypeDetailDESC(String name, String type_detail, Pageable pageable);

    @Query(value = "(SELECT * FROM product WHERE name LIKE %?1% AND type_detail = ?2 AND size LIKE %?3% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) ASC LIMIT 10000)"
            + "UNION "
            + "(SELECT * FROM product WHERE name NOT LIKE %?1% AND type_detail = ?2 AND size LIKE %?3% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) ASC LIMIT 10000)", nativeQuery = true)
    List<Product> findAllByNameTypeDetailSizeASC(String name, String type_detail, String size, Pageable pageable);

    @Query(value = "(SELECT * FROM product WHERE name LIKE %?1% AND type_detail = ?2 ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) ASC LIMIT 10000)"
            + "UNION "
            + "(SELECT * FROM product WHERE name NOT LIKE %?1% AND type_detail = ?2 ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) ASC LIMIT 10000)", nativeQuery = true)
    List<Product> findAllByNameTypeDetailASC(String name, String type_detail, Pageable pageable);

    @Query(value = "(SELECT * FROM product WHERE name LIKE %?1% AND type_detail = ?2 ORDER BY id DESC LIMIT 10000)"
            + "UNION "
            + "(SELECT * FROM product WHERE name NOT LIKE %?1% AND type_detail = ?2 ORDER BY id DESC LIMIT 10000)", nativeQuery = true)
    List<Product> findAllByNameTypeDetail(String name, String type_detail, Pageable pageable);

    @Query(value = "(SELECT * FROM product WHERE name LIKE %?1% AND type_detail = ?2 AND size LIKE %?3% ORDER BY id DESC LIMIT 10000)"
            + "UNION "
            + "(SELECT * FROM product WHERE name NOT LIKE %?1% AND type_detail = ?2 AND size LIKE %?3% ORDER BY id DESC LIMIT 10000)", nativeQuery = true)
    List<Product> findAllByNameTypeDetailSize(String name, String type_detail, String size, Pageable pageable);

    @Query(value = "(SELECT * FROM product WHERE name LIKE %?1% AND type = ?2 AND size LIKE %?3% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) DESC LIMIT 10000)"
            + "UNION "
            + "(SELECT * FROM product WHERE name NOT LIKE %?1% AND type = ?2 AND size LIKE %?3% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) DESC LIMIT 10000)", nativeQuery = true)
    List<Product> findAllByNameTypeSizeDESC(String name, String type, String size, Pageable pageable);

    @Query(value = "(SELECT * FROM product WHERE name LIKE %?1% AND type = ?2 ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) DESC LIMIT 10000)"
            + "UNION "
            + "(SELECT * FROM product WHERE name NOT LIKE %?1% AND type = ?2 ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) DESC LIMIT 10000)", nativeQuery = true)
    List<Product> findAllByNameTypeDESC(String name, String type, Pageable pageable);

    @Query(value = "(SELECT * FROM product WHERE name LIKE %?1% AND type = ?2 AND size LIKE %?3% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) ASC LIMIT 10000)"
            + "UNION "
            + "(SELECT * FROM product WHERE name NOT LIKE %?1% AND type = ?2 AND size LIKE %?3% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) ASC LIMIT 10000)", nativeQuery = true)
    List<Product> findAllByNameTypeSizeASC(String name, String type, String size, Pageable pageable);

    @Query(value = "(SELECT * FROM product WHERE name LIKE %?1% AND type = ?2 ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) ASC LIMIT 10000)"
            + "UNION "
            + "(SELECT * FROM product WHERE name NOT LIKE %?1% AND type = ?2 ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) ASC LIMIT 10000)", nativeQuery = true)
    List<Product> findAllByNameTypeASC(String name, String type, Pageable pageable);

    @Query(value = "(SELECT * FROM product WHERE name LIKE %?1% AND type = ?2 ORDER BY id DESC LIMIT 10000)"
            + "UNION "
            + "(SELECT * FROM product WHERE name NOT LIKE %?1% AND type = ?2 ORDER BY id DESC LIMIT 10000)", nativeQuery = true)
    List<Product> findAllByNameType(String name, String type, Pageable pageable);

    @Query(value = "(SELECT * FROM product WHERE name LIKE %?1% AND type = ?2 AND size LIKE %?3% ORDER BY id DESC LIMIT 10000)"
            + "UNION "
            + "(SELECT * FROM product WHERE name NOT LIKE %?1% AND type = ?2 AND size LIKE %?3% ORDER BY id DESC LIMIT 10000)", nativeQuery = true)
    List<Product> findAllByNameTypeSize(String name, String type, String size, Pageable pageable);

    @Query(value = "(SELECT * FROM product WHERE name LIKE %?1% AND size LIKE %?2% ORDER BY id DESC LIMIT 10000)"
            + "UNION "
            + "(SELECT * FROM product WHERE name NOT LIKE %?1% AND size LIKE %?2% ORDER BY id DESC LIMIT 10000)", nativeQuery = true)
    List<Product> findAllByNameSize(String name, String size, Pageable pageable);

    @Query(value = "(SELECT * FROM product WHERE name LIKE %?1% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) DESC LIMIT 10000)"
            + "UNION "
            + "(SELECT * FROM product WHERE name NOT LIKE %?1% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) DESC LIMIT 10000)", nativeQuery = true)
    List<Product> findAllByNameDESC(String name, Pageable pageable);

    @Query(value = "(SELECT * FROM product WHERE name LIKE %?1% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) ASC LIMIT 10000)"
            + "UNION "
            + "(SELECT * FROM product WHERE name NOT LIKE %?1% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) ASC LIMIT 10000)", nativeQuery = true)
    List<Product> findAllByNameASC(String name, Pageable pageable);

    @Query(value = "(SELECT * FROM product WHERE name LIKE %?1% AND size LIKE %?2% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) DESC LIMIT 10000)"
            + "UNION "
            + "(SELECT * FROM product WHERE name NOT LIKE %?1% AND size LIKE %?2% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) DESC LIMIT 10000)", nativeQuery = true)
    List<Product> findAllByNameAndSizeDESC(String name, String size, Pageable pageable);

    @Query(value = "(SELECT * FROM product WHERE name LIKE %?1% AND size LIKE %?2% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) ASC LIMIT 10000)"
            + "UNION "
            + "(SELECT * FROM product WHERE name NOT LIKE %?1% AND size LIKE %?2% ORDER BY CAST(REPLACE(price,',','') AS DECIMAL) ASC LIMIT 10000)", nativeQuery = true)
    List<Product> findAllByNameAndSizeASC(String name, String size, Pageable pageable);

}
