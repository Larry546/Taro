package com.lhn.travel.controller;

import com.lhn.travel.entity.Orderdetail;
import com.lhn.travel.service.IOrderdetailService;
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
@RequestMapping("/orderdetail")
public class OrderdetailController {

    @Resource
    private IOrderdetailService orderdetailService;

    @PostMapping("/save")
    public Boolean save(@RequestBody Orderdetail orderdetail) {
        return orderdetailService.saveOrUpdate(orderdetail);
    }

    @DeleteMapping("/delete/{id}")
    public Boolean delete(@PathVariable Integer id) {
        return orderdetailService.removeById(id);
    }

    @GetMapping("/list")
    public List<Orderdetail> findAll() {
        return orderdetailService.list();
    }

    @GetMapping("/find/{id}")
    public List<Orderdetail> findOne(@PathVariable Integer id) {
        return orderdetailService.list();
    }


}

