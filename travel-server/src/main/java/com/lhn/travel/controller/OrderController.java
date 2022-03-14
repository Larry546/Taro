package com.lhn.travel.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lhn.travel.entity.Order;
import com.lhn.travel.service.IOrderService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;


/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author lhn
 * @since 2022-03-10
 */
@RestController
@RequestMapping("/order")
public class OrderController {

    @Resource
    private IOrderService orderService;

    @PostMapping("/save")
    public Boolean save(@RequestBody Order order) {
        return orderService.saveOrUpdate(order);
    }

    @GetMapping("/list")
    public List<Order> findAll() {
        return orderService.list();
    }

    @GetMapping("/find/{id}")
    public Order findOne(@PathVariable Integer id) {
        return orderService.getById(id);
    }

    @GetMapping("/page")
    public Page<Order> findPage(@RequestParam Integer pageNum,
                                @RequestParam Integer pageSize) {
        return orderService.page(new Page<>(pageNum, pageSize));
    }

    @GetMapping("/listByUser")
    public List findByUser(@RequestParam Integer uid, @RequestParam Integer type) {
        return orderService.findByUser(uid);
    }

    @DeleteMapping("/delete/{id}")
    public Boolean delete(@PathVariable Integer id) {
        return orderService.delete(id);
    }
}

