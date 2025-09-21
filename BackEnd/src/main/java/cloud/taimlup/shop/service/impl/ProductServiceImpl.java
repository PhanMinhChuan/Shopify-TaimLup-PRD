package cloud.taimlup.shop.service.impl;

import cloud.taimlup.shop.entity.Image;
import cloud.taimlup.shop.entity.Product;
import cloud.taimlup.shop.repository.ProductRepository;
import cloud.taimlup.shop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Override
    public void create_product(String type, String type_detail, String name, String size, String size_model, String size_length, String size_waist, String size_leg, String condition_percent, String trademark, String price, String attribute) {
        Product product = new Product(type, type_detail, name, size, size_model, size_length, size_waist, size_leg, condition_percent, trademark, price, attribute);
        productRepository.save(product);
    }

    @Override
    public void create_products(List<Product> products) {
        products.forEach((element) -> {
            productRepository.save(element);
        });
    }

    @Override
    public Product product(Long id) {
        return productRepository.getOne(id);
    }

    @Override
    public List<Product> products() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> products_type(String Type) {
        return null;
    }

    @Override
    public List<Product> products_trademark(String trademark) {
        return null;
    }

    @Override
    public List<Product> products_type_trademark(String Type, String trademark) {
        return null;
    }
}
