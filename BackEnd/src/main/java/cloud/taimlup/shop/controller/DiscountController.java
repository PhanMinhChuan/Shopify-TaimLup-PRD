package cloud.taimlup.shop.controller;

import cloud.taimlup.shop.entity.Discount;
import cloud.taimlup.shop.entity.Image;
import cloud.taimlup.shop.entity.Product;
import cloud.taimlup.shop.repository.DiscountRepository;
import cloud.taimlup.shop.repository.ImageRepository;
import cloud.taimlup.shop.repository.ProductRepository;
import cloud.taimlup.shop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("vintage")
public class DiscountController {

    @Autowired
    DiscountRepository discountRepository;

    @GetMapping("/discounts")
    @CrossOrigin
    public List<Discount> discounts() {
        return discountRepository.findAllByOrderByIdDesc();
    }

    @GetMapping("/discount/{id}")
    @CrossOrigin
    public Discount discount(@PathVariable long id) {
        return discountRepository.getOne(id);
    }

    @GetMapping("/discount_check/{code}")
    @CrossOrigin
    public Optional<Discount> discount(@PathVariable String code) {
        return discountRepository.findByCode(code);
    }

    @PostMapping("/discount/create")
    @CrossOrigin
    public String discount_create(@RequestParam("start_date") Date start_date, @RequestParam("end_date") Date end_date,
                                 @RequestParam("code") String code, @RequestParam("type") String type, @RequestParam("discount_price") String discount_price,
                                 @RequestParam("discount_percent") String discount_percent) {
        Discount discount = new Discount(start_date, end_date, code, type, discount_price, discount_percent);
        discountRepository.save(discount);

        return "Thêm mã giảm giá thành công!";
    }

    @PostMapping("/discount/update/{id}")
    @CrossOrigin
    public String product_update(@PathVariable long id, @RequestParam("start_date") Date start_date, @RequestParam("end_date") Date end_date,
                                 @RequestParam("code") String code, @RequestParam("type") String type,
                                 @RequestParam("discount_price") String discount_price, @RequestParam("discount_percent") String discount_percent) {
        Discount discount = discountRepository.getOne(id);
        discount.setStart_date(start_date);
        discount.setEnd_date(end_date);
        discount.setCode(code);
        discount.setType(type);
        discount.setDiscount_price(discount_price);
        discount.setDiscount_percent(discount_percent);

        discountRepository.save(discount);

        return "Update mã giảm giá thành công!";
    }

    @DeleteMapping("/discount/delete/{id}")
    @CrossOrigin
    public String discounts_delete(@PathVariable long id) {
        discountRepository.deleteById(id);

        return "Xóa mã giảm giá thành công!";
    }
}
