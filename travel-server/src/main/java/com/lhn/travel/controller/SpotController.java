package com.lhn.travel.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.lhn.travel.entity.Spot;
import com.lhn.travel.service.ISpotService;
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
@RequestMapping("/spot")
public class SpotController {

    @Resource
    private ISpotService spotService;

    @PostMapping("/save")
    public Boolean save(@RequestBody Spot spot) {
        return spotService.saveOrUpdate(spot);
    }

    @DeleteMapping("/delete/{id}")
    public Boolean delete(@PathVariable Integer id) {
        UpdateWrapper<Spot> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("spot_id", id);
        updateWrapper.set("is_deleted", 1);
        return spotService.update(updateWrapper);
    }

    @DeleteMapping("/undelete/{id}")
    public Boolean undelete(@PathVariable Integer id) {
        UpdateWrapper<Spot> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("spot_id", id);
        updateWrapper.set("is_deleted", 0);
        return spotService.update(updateWrapper);
    }

    @GetMapping("/list")
    public List<Spot> findAll() {
        QueryWrapper<Spot> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("is_deleted", 0);
        return spotService.list(queryWrapper);
    }

    @GetMapping("/adminList")
    public List<Spot> adminfindAll() {
        return spotService.list();
    }

    @GetMapping("/find/{id}")
    public Spot findOne(@PathVariable Integer id) {
        return spotService.getById(id);
    }


    @GetMapping("/listByUser/{id}")
    public List findByUser(@PathVariable Integer id) {
        return spotService.findByUser(id);
    }

    @GetMapping("/listByType/{type}")
    public List<Spot> findByType(@PathVariable String type) {
        QueryWrapper<Spot> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("spot_type", type);
        queryWrapper.eq("is_deleted", 0);
        return spotService.list(queryWrapper);
    }

    @GetMapping("/listByName/{keyword}")
    public List<Spot> findByName(@PathVariable String keyword) {
        QueryWrapper<Spot> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("spot_name", keyword);
        queryWrapper.eq("is_deleted", 0);
        return spotService.list(queryWrapper);
    }

}

