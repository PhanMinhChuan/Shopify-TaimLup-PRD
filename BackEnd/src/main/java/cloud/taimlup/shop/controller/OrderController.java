package cloud.taimlup.shop.controller;

import cloud.taimlup.shop.entity.*;
import cloud.taimlup.shop.repository.DiscountRepository;
import cloud.taimlup.shop.repository.OrderRepository;
import cloud.taimlup.shop.repository.ProductOrderRepository;
import cloud.taimlup.shop.repository.ProductRepository;
import lombok.Synchronized;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("vintage")
public class OrderController {

    @Autowired
    OrderRepository orderRepository;
    //IoC

    @Autowired
    ProductOrderRepository productOrderRepository;

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/orders")
    @CrossOrigin
    public List<Order> orders() {
        return orderRepository.findAllByOrderByIdDesc();
    }

    @GetMapping("/orders/trash")
    @CrossOrigin
    public List<Order> orders_trash() {
        return orderRepository.findAllByOrderByIdDescTrash();
    }

    @GetMapping("/order/{id}")
    @CrossOrigin
    public Optional<Order> order(@PathVariable long id) {
        return orderRepository.findById(id);
    }

    @RequestMapping(value = "/order/create", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @CrossOrigin
    @Transactional(isolation= Isolation.SERIALIZABLE)
    public ResponseEntity<List<Product>> order_create(@RequestBody Order order) {
        List<Product> productsNotYetBuy = new ArrayList<>();

        for (int i = 0; i < order.getList_id().length; i++) {
            Optional<Product> product = productRepository.findById(order.getList_id()[i]);
            if (product.get().getWait_buy() == 1) {
                productsNotYetBuy.add(product.get());
            }
        }

        if (productsNotYetBuy.size() == 0) {
            List<ProductOrder> productOrders = new ArrayList<>();

            for (int i = 0; i < order.getList_id().length; i++) {
                Optional<Product> product = productRepository.findById(order.getList_id()[i]);
                product.get().setWait_buy(1);
                productRepository.save(product.get());

                ProductOrder productOrder = new ProductOrder();
                productOrder.setName(product.get().getName());
                productOrder.setImage(product.get().getImages().get(0).getPath());
                productOrder.setPrice(product.get().getPrice());
                productOrder.setOrder(order);

                productOrders.add(productOrder);
                productOrderRepository.save(productOrder);
            }

            order.setProducts(productOrders);
            orderRepository.save(order);

            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
        return new ResponseEntity<>(productsNotYetBuy, HttpStatus.OK);
    }

    @DeleteMapping("/order/delete/{id}")
    @CrossOrigin
    public String order_delete(@PathVariable long id) {
        //orderRepository.deleteById(id);
        Optional<Order> order = orderRepository.findById(id);
        order.get().setStatus_ship(1);

        orderRepository.save(order.get());
        return "Xóa order thành công!";
    }

    @DeleteMapping("/order/delete_real/{id}")
    @CrossOrigin
    public String order_delete_delete(@PathVariable long id) {
        //orderRepository.deleteById(id);
        Optional<Order> order = orderRepository.findById(id);
        order.get().setStatus_ship(2);

        orderRepository.save(order.get());
        return "Xóa order thành công!";
    }

}
