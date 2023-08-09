package cloud.taimlup.shop.controller;

import cloud.taimlup.shop.CommonUtil.Const;
import cloud.taimlup.shop.entity.CountView;
import cloud.taimlup.shop.entity.Image;
import cloud.taimlup.shop.entity.Order;
import cloud.taimlup.shop.entity.Product;
import cloud.taimlup.shop.repository.CountViewRepository;
import cloud.taimlup.shop.repository.ImageRepository;
import cloud.taimlup.shop.repository.ProductRepository;
import cloud.taimlup.shop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("vintage")
public class ProductController {
    @Autowired
    ProductService productService;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    CountViewRepository countViewRepository;

    @GetMapping("/products")
    @CrossOrigin
    public List<Product> products(@RequestParam(value="page", defaultValue = Const.NUMBER_PAGE_START_DEFAULT) Integer page,
                                  @RequestParam(value="size", defaultValue = Const.NUMBER_SIZE_PAGE_DEFAULT) Integer size) {
        return productRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending())).getContent();
    }

    @GetMapping("/products/random")
    @CrossOrigin
    public List<Product> products_random(@RequestParam(value="page", defaultValue = Const.NUMBER_PAGE_START_DEFAULT) Integer page,
                                  @RequestParam(value="size", defaultValue = Const.NUMBER_SIZE_PAGE_DEFAULT) Integer size) {
        try {
            if (page == 0) {
                Optional<CountView> countView = countViewRepository.findById(1L);
                int count = countView.get().getCount_view_web() + 1;
                countView.get().setCount_view_web(count);
                countViewRepository.save(countView.get());
            }
        } catch (Exception e) {
        }

        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAllRandom(pageable);
    }

    @RequestMapping(value = "/product/list", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @CrossOrigin
    public List<Product> products_list(@RequestBody Order order) {
        List<Product> productList = new ArrayList<>();
        for (int i = 0; i < order.getList_id().length; i++) {
            try {
                productList.add(productRepository.findById(order.getList_id()[i]).get());
            } catch (NoSuchElementException e) {
            }
        }
        return productList;
    }

    @GetMapping("/products/combobox")
    @CrossOrigin
    public List<Product> products_combobox(@RequestParam(value="page", defaultValue = Const.NUMBER_PAGE_START_DEFAULT) Integer page,
                                           @RequestParam(value="size", defaultValue = Const.NUMBER_SIZE_PAGE_DEFAULT) Integer size,
                                           @RequestParam(value="type") String type, @RequestParam(value="type_detail") String type_detail,
                                           @RequestParam(value="order_by") String order_by, @RequestParam(value="size_choose") String size_choose,
                                           @RequestParam(value="search") String search) {
        Pageable pageable = PageRequest.of(page, size);
        if (search.equals("") && type.equals("") && type_detail.equals("") && order_by.equals("") && size_choose.equals("")) {
            return productRepository.findAllRandom(pageable);
        } else if (search.equals("") && type.equals("") && type_detail.equals("") && !size_choose.equals("")) {
            if (order_by.equals("desc")) {
                return productRepository.findAllOrderByDESCWithSize(pageable, size_choose);
            } else if (order_by.equals("asc")) {
                return productRepository.findAllOrderByASCWithSize(pageable, size_choose);
            } else {
                return productRepository.findAllWithSize(size_choose, pageable);
            }
        } else if (search.equals("") && type.equals("") && type_detail.equals("") && order_by.equals("desc")) {
            return productRepository.findAllOrderByDESC(pageable);
        } else if (search.equals("") && type.equals("") && type_detail.equals("") && order_by.equals("asc")) {
            return productRepository.findAllOrderByASC(pageable);
        }

        if (!search.equals("")) {
            if (!type_detail.equals("")) {
                if (order_by.equals("desc")) {
                    if (size_choose.equals("")) {
                        return productRepository.findAllByNameTypeDetailDESC(search, type_detail, pageable);
                    }
                    return productRepository.findAllByNameTypeDetailSizeDESC(search, type_detail, size_choose, pageable);
                } else if (order_by.equals("asc")) {
                    if (size_choose.equals("")) {
                        return productRepository.findAllByNameTypeDetailASC(search, type_detail, pageable);
                    }
                    return productRepository.findAllByNameTypeDetailSizeASC(search, type_detail, size_choose, pageable);
                } else if (!size_choose.equals("")) {
                    return productRepository.findAllByNameTypeDetailSize(search, type_detail, size_choose, pageable);
                }
                return productRepository.findAllByNameTypeDetail(search, type_detail, pageable);
            } else if (!type.equals("")) {
                if (order_by.equals("desc")) {
                    if (size_choose.equals("")) {
                        return productRepository.findAllByNameTypeDESC(search, type, pageable);
                    }
                    return productRepository.findAllByNameTypeSizeDESC(search, type, size_choose, pageable);
                } else if (order_by.equals("asc")) {
                    if (size_choose.equals("")) {
                        return productRepository.findAllByNameTypeASC(search, type, pageable);
                    }
                    return productRepository.findAllByNameTypeSizeASC(search, type, size_choose, pageable);
                } else if (!size_choose.equals("")) {
                    return productRepository.findAllByNameTypeSize(search, type, size_choose, pageable);
                }
                return productRepository.findAllByNameType(search, type, pageable);
            } else if (!size_choose.equals("")) {
                if (order_by.equals("desc")) {
                    return productRepository.findAllByNameAndSizeDESC(search, size_choose, pageable);
                } else if (order_by.equals("asc")) {
                    return productRepository.findAllByNameAndSizeASC(search, size_choose, pageable);
                }
                return productRepository.findAllByNameSize(search, size_choose, pageable);
            } else if (order_by.equals("desc")) {
                return productRepository.findAllByNameDESC(search, pageable);
            } else if (order_by.equals("asc")) {
                return productRepository.findAllByNameASC(search, pageable);
            }
            return productRepository.findAllByNameButAllItem(search, pageable);
        }
        if (!type_detail.equals("")) {
            if (order_by.equals("desc")) {
                if (size_choose.equals("")) {
                    return productRepository.findAllByTypeDetailOrderByDESC(pageable, type_detail);
                }
                return productRepository.findAllByTypeDetailOrderByDESCWithSize(pageable, type_detail, size_choose);
            } else if (order_by.equals("asc")) {
                if (size_choose.equals("")) {
                    return productRepository.findAllByTypeDetailOrderByASC(pageable, type_detail);
                }
                return productRepository.findAllByTypeDetailOrderByASCWithSize(pageable, type_detail, size_choose);
            } else if (!size_choose.equals("")) {
                return productRepository.findAllByTypeDetailWithSize(type_detail, size_choose, pageable);
            }
            return productRepository.findAllByTypeDetail(type_detail, pageable);
        } else if (!type.equals("")) {
            if (order_by.equals("desc")) {
                if (size_choose.equals("")) {
                    return productRepository.findAllByTypeOrderByDESC(pageable, type);
                }
                return productRepository.findAllByTypeOrderByDESCWithSize(pageable, type, size_choose);
            } else if (order_by.equals("asc")) {
                if (size_choose.equals("")) {
                    return productRepository.findAllByTypeOrderByASC(pageable, type);
                }
                return productRepository.findAllByTypeOrderByASCWithSize(pageable, type, size_choose);
            } else if (!size_choose.equals("")) {
                return productRepository.findAllByTypeWithSize(type, size_choose, pageable);
            }
            return productRepository.findAllByType(type, pageable);
        }

        //return productRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending())).getContent();
        return productRepository.findAllRandom(pageable);
    }

    @GetMapping("/products/desc")
    @CrossOrigin
    public List<Product> productsDesc(@RequestParam(value="page", defaultValue = Const.NUMBER_PAGE_START_DEFAULT) Integer page,
                                      @RequestParam(value="size", defaultValue = Const.NUMBER_SIZE_PAGE_DEFAULT) Integer size,
                                      @RequestParam(value="size_choose") String size_choose) {
        Pageable pageable = PageRequest.of(page, size);
        if (size_choose.equals("") || size_choose == "") {
            return productRepository.findAllOrderByDESC(pageable);
        }
        return productRepository.findAllOrderByDESCWithSize(pageable, size_choose);
    }

    @GetMapping("/products_type/desc/{type}")
    @CrossOrigin
    public List<Product> products_type_desc(@RequestParam(value="page", defaultValue = Const.NUMBER_PAGE_START_DEFAULT) Integer page,
                                            @RequestParam(value="size", defaultValue = Const.NUMBER_SIZE_PAGE_DEFAULT) Integer size,
                                            @PathVariable String type, @RequestParam(value="size_choose") String size_choose) {
        Pageable pageable = PageRequest.of(page, size);
        if (size_choose.equals("") || size_choose == "") {
            return productRepository.findAllByTypeOrderByDESC(pageable, type);
        }
        return productRepository.findAllByTypeOrderByDESCWithSize(pageable, type, size_choose);
    }

    @GetMapping("/products_type_detail/desc/{type_detail}")
    @CrossOrigin
    public List<Product> products_type_detail_desc(@RequestParam(value="page", defaultValue = Const.NUMBER_PAGE_START_DEFAULT) Integer page,
                                                   @RequestParam(value="size", defaultValue = Const.NUMBER_SIZE_PAGE_DEFAULT) Integer size,
                                                   @PathVariable String type_detail, @RequestParam(value="size_choose") String size_choose) {
        Pageable pageable = PageRequest.of(page, size);
        if (size_choose.equals("") || size_choose == "") {
            return productRepository.findAllByTypeDetailOrderByDESC(pageable, type_detail);
        }
        return productRepository.findAllByTypeDetailOrderByDESCWithSize(pageable, type_detail, size_choose);
    }

    @GetMapping("/products_type/asc/{type}")
    @CrossOrigin
    public List<Product> products_type_asc(@RequestParam(value="page", defaultValue = Const.NUMBER_PAGE_START_DEFAULT) Integer page,
                                           @RequestParam(value="size", defaultValue = Const.NUMBER_SIZE_PAGE_DEFAULT) Integer size,
                                           @PathVariable String type, @RequestParam(value="size_choose") String size_choose) {
        Pageable pageable = PageRequest.of(page, size);
        if (size_choose.equals("") || size_choose == "") {
            return productRepository.findAllByTypeOrderByASC(pageable, type);
        }
        return productRepository.findAllByTypeOrderByASCWithSize(pageable, type, size_choose);
    }

    @GetMapping("/products_type_detail/asc/{type_detail}")
    @CrossOrigin
    public List<Product> products_type_detail_asc(@RequestParam(value="page", defaultValue = Const.NUMBER_PAGE_START_DEFAULT) Integer page,
                                                  @RequestParam(value="size", defaultValue = Const.NUMBER_SIZE_PAGE_DEFAULT) Integer size,
                                                  @PathVariable String type_detail,  @RequestParam(value="size_choose") String size_choose) {
        Pageable pageable = PageRequest.of(page, size);
        if (size_choose.equals("") || size_choose == "") {
            return productRepository.findAllByTypeDetailOrderByASC(pageable, type_detail);
        }
        return productRepository.findAllByTypeDetailOrderByASCWithSize(pageable, type_detail, size_choose);
    }


    @GetMapping("/products/asc")
    @CrossOrigin
    public List<Product> productsAsc(@RequestParam(value="page", defaultValue = Const.NUMBER_PAGE_START_DEFAULT) Integer page,
                                     @RequestParam(value="size", defaultValue = Const.NUMBER_SIZE_PAGE_DEFAULT) Integer size,
                                     @RequestParam(value="size_choose") String size_choose) {
        Pageable pageable = PageRequest.of(page, size);
        if (size_choose.equals("") || size_choose == "") {
            return productRepository.findAllOrderByASC(pageable);
        }
        return productRepository.findAllOrderByASCWithSize(pageable, size_choose);
    }

    @GetMapping("/products/wait_buy")
    @CrossOrigin
    public List<Product> productsByWaitBuy(@RequestParam(value="page", defaultValue = Const.NUMBER_PAGE_START_DEFAULT) Integer page,
                                           @RequestParam(value="size", defaultValue = Const.NUMBER_SIZE_PAGE_DEFAULT) Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAllByWaitBuy(pageable);
    }

    @GetMapping("/products_type/{type}")
    @CrossOrigin
    public List<Product> products_type(@RequestParam(value="page", defaultValue = Const.NUMBER_PAGE_START_DEFAULT) Integer page,
                                       @RequestParam(value="size", defaultValue = Const.NUMBER_SIZE_PAGE_DEFAULT) Integer size,
                                       @PathVariable String type) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAllByType(type, pageable);
    }

    @GetMapping("/products_type_detail/{type_detail}")
    @CrossOrigin
    public List<Product> products_type_detail(@RequestParam(value="page", defaultValue = Const.NUMBER_PAGE_START_DEFAULT) Integer page,
                                              @RequestParam(value="size", defaultValue = Const.NUMBER_SIZE_PAGE_DEFAULT) Integer size,
                                              @PathVariable String type_detail) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAllByTypeDetail(type_detail, pageable);
    }

    @GetMapping("/product/search/{name}")
    @CrossOrigin
    public List<Product> product_search(@PathVariable String name) {
        return productRepository.findAllByName(name);
    }

    @GetMapping("/product/search/all/{name}")
    @CrossOrigin
    public List<Product> product_search_all(@RequestParam(value="page", defaultValue = Const.NUMBER_PAGE_START_DEFAULT) Integer page,
                                            @RequestParam(value="size", defaultValue = Const.NUMBER_SIZE_PAGE_DEFAULT) Integer size,
                                            @PathVariable String name) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAllByNameButAllItem(name, pageable);
    }

    @GetMapping("/products/trash")
    @CrossOrigin
    public List<Product> products_trash() {
        return productRepository.findAllByWaitBuyTrash();
    }

    @PutMapping("/product/trash/{id}")
    @CrossOrigin
    public String products_trash_back(@PathVariable long id) {
        Product product = productRepository.getOne(id);
        if (product != null) {
            product.setWait_buy(0);
        }
        productRepository.save(product);
        return "hoàn tác thành công";
    }

    @GetMapping("/product/{id}")
    @CrossOrigin
    public Product product(@PathVariable long id) {
        return productService.product(id);
    }

    @RequestMapping(value = "/product/upload",
            method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @CrossOrigin
    @Transactional
    public String product_upload(@RequestPart(value = "image") MultipartFile[] file, @RequestParam("type") String type, @RequestParam("type_detail") String type_detail,
                                 @RequestParam("name") String name, @RequestParam("size") String size, @RequestParam("size_model") String size_model,
                                 @RequestParam("size_length") String size_length, @RequestParam("size_waist") String size_waist, @RequestParam("size_leg") String size_leg,
                                 @RequestParam("condition_percent") String condition_percent, @RequestParam("trademark") String trademark, @RequestParam("price") String price) throws IOException {
        String UPLOAD_DIRECTORY = "/var/www/html/images/shop/products_test";
        ArrayList<Image> images = new ArrayList<>();
        Product product = new Product(type, type_detail, name, size, size_model, size_length, size_waist, size_leg, condition_percent, trademark, price);
        productRepository.save(product);

        long products_size = productRepository.findIdMax();
        for (int i = 0; i < file.length; i++) {
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY,   products_size + "-" + (i + 1) + '.' + file[i].getOriginalFilename().split("\\.")[1]);
            Files.write(fileNameAndPath, file[i].getBytes());
            Image image = new Image(product, "/images/shop/products_test/" + fileNameAndPath.getFileName());
            images.add(image);
            imageRepository.save(image);
        }
        product.setImages(images);
        productRepository.save(product);

        return "Thêm sản phẩm thành công!";

        //SSR server site render -> search google khi tìm kiếm product thì gender ra sản phẩm chuẩn SALE. Ưu tiên phần SALE
        //Nuxt
        //React, Nextjs
        //Vue, Nuxt
        //Single page application
    }

    @PostMapping("/product/update/{id}")
    @CrossOrigin
    @Transactional
    public String product_update(@PathVariable long id, @RequestPart(value = "image") MultipartFile[] file, @RequestParam("type") String type, @RequestParam("type_detail") String type_detail,
                                 @RequestParam("name") String name, @RequestParam("size") String size, @RequestParam("size_model") String size_model,
                                 @RequestParam("size_length") String size_length, @RequestParam("size_waist") String size_waist, @RequestParam("size_leg") String size_leg,
                                 @RequestParam("condition_percent") String condition_percent, @RequestParam("trademark") String trademark, @RequestParam("price") String price, @RequestParam("reduced_price") String reduced_price) throws IOException {
        String UPLOAD_DIRECTORY = "/var/www/html/images/shop/products_test";
        Product product = productRepository.getOne(id);

        if (file.length > 0 ) {
            List<Image> images = product.getImages();
            for (int i = 0; i < images.size(); i++) {
                File file_image_old = new File("/var/www/html" + images.get(i).getPath());
                if(file_image_old.delete()){
                    System.out.println("Xóa file:" + "/var/www/html" + images.get(i).getPath());
                } else {
                    System.out.println("Lỗi chưa xóa:" + "/var/www/html" + images.get(i).getPath());
                }
            }

            imageRepository.deleteByProductId(id);

            for (int i = 0; i < file.length; i++) {
                Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY,  id +"-" + (images.size() + 1) + '.' + file[i].getOriginalFilename().split("\\.")[1]);
                Files.write(fileNameAndPath, file[i].getBytes());
                Image image = new Image(product, "/images/shop/products_test/" + fileNameAndPath.getFileName());
                images.add(image);
                imageRepository.save(image);
            }
            product.setImages(images);
        }
        product.setType(type);
        product.setType_detail(type_detail);
        product.setName(name);
        product.setSize(size);
        product.setPrice(price);
        product.setSize_length(size_length);
        product.setSize_waist(size_waist);
        product.setSize_leg(size_leg);
        product.setCondition_percent(condition_percent);
        product.setTrademark(trademark);
        product.setSize_model(size_model);
        product.setReduced_price(reduced_price);

        productRepository.save(product);
        return "Update sản phẩm thành công!";
    }

    @DeleteMapping("/product/delete/{id}")
    @CrossOrigin
    @Transactional
    public String product_delete(@PathVariable long id) {
        Optional<Product> product = productRepository.findById(id);
        String UPLOAD_DIRECTORY = "/var/www/html";

        try {
            List<Image> images = product.get().getImages();
            for (int i = 0; i < images.size(); i++) {
                File file = new File(UPLOAD_DIRECTORY + images.get(i).getPath());
                if(file.delete()){
                    System.out.println("Xóa file:" + UPLOAD_DIRECTORY + images.get(i).getPath());
                } else {
                    System.out.println("Lỗi chưa xóa:" + UPLOAD_DIRECTORY + images.get(i).getPath());
                }
            }
            productRepository.deleteById(id);
        } catch (NoSuchElementException e) {
        }
        return "Xóa sản phẩm thành công!";
    }

    @DeleteMapping("/product/soldout/{id}")
    @CrossOrigin
    public String product_sold_out(@PathVariable long id) {
        Optional<Product> product = productRepository.findById(id);
        try {
            product.get().setWait_buy(1);
            productRepository.save(product.get());
        } catch (NoSuchElementException e) {
        }
        return "Đã bán sản phẩm thành công!";
    }
}
