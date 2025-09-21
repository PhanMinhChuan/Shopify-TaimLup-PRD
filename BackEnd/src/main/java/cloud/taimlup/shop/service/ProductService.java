package cloud.taimlup.shop.service;

import cloud.taimlup.shop.entity.Image;
import cloud.taimlup.shop.entity.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {

    public void create_product(String type, String type_detail, String name, String size, String size_model, String size_length, String size_waist, String size_leg, String condition_percent, String trademark, String price, String attribute);

    public void create_products (List<Product> products);

    public Product product (Long id);

    public List<Product> products ();

    public List<Product> products_type (String Type);

    public List<Product> products_trademark (String trademark);

    public List<Product> products_type_trademark (String Type, String trademark);

}
