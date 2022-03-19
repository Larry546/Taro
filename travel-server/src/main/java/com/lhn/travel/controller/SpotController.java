package com.lhn.travel.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
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
        return spotService.removeById(id);
    }

    @GetMapping("/list")
    public List<Spot> findAll() {
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
        return spotService.list(queryWrapper);
    }

    @GetMapping("/listByName/{keyword}")
    public List<Spot> findByName(@PathVariable String keyword) {
        QueryWrapper<Spot> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("spot_name", keyword);
        return spotService.list(queryWrapper);
    }

}

