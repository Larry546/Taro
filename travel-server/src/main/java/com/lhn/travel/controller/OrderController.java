package com.lhn.travel.controller;

import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
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
    public Integer save(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }

    @PostMapping("/update")
    public Boolean update(@RequestBody Order order) {
        return orderService.updateById(order);
    }

    @GetMapping("/list")
    public List<Order> findAll() {
        return orderService.list();
    }

    @GetMapping("/find/{id}")
    public Order findOne(@PathVariable Integer id) {
        return orderService.getById(id);
    }


    @GetMapping("/listByUser")
    public List findByUser(@RequestParam Integer uid, @RequestParam Integer type) {
        return orderService.findByUser(uid, type);
    }

    @DeleteMapping("/delete/{id}")
    public Boolean delete(@PathVariable Integer id) {
        UpdateWrapper<Order> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("order_id", id);
        updateWrapper.set("is_deleted", 1);
        return orderService.update(updateWrapper);
    }

    @DeleteMapping("/undelete/{id}")
    public Boolean undelete(@PathVariable Integer id) {
        UpdateWrapper<Order> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("order_id", id);
        updateWrapper.set("is_deleted", 0);
        return orderService.update(updateWrapper);
    }

    @GetMapping("/count")
    public Long getCount() {
        return orderService.count();
    }
}

