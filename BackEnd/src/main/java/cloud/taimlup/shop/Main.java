package cloud.taimlup.shop;

import cloud.taimlup.shop.entity.Product;
import cloud.taimlup.shop.repository.ProductRepository;
import cloud.taimlup.shop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@EnableConfigurationProperties
@EntityScan(basePackages = {"cloud.taimlup.shop.entity"})
public class Main implements CommandLineRunner{
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Autowired
    ProductService productService;

    @Override
    public void run(String... args) throws Exception {

        List<Product> products = new ArrayList<>();

        productService.create_products(products);
    }
}