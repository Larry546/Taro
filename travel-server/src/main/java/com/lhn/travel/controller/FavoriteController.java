package com.lhn.travel.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lhn.travel.entity.Favorite;
import com.lhn.travel.service.IFavoriteService;
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
@RequestMapping("/favorite")
public class FavoriteController {

    @Resource
    private IFavoriteService favoriteService;

    @PostMapping("/save")
    public Boolean save(@RequestBody Favorite favorite) {
        return favoriteService.saveOrUpdate(favorite);
    }

    @DeleteMapping("/delete/{id}")
    public Boolean delete(@PathVariable Integer id) {
        return favoriteService.removeById(id);
    }

    @GetMapping("/list")
    public List<Favorite> findAll() {
        return favoriteService.list();
    }

    @GetMapping("/find/{id}")
    public List<Favorite> findOne(@PathVariable Integer id) {
        return favoriteService.list();
    }

    @GetMapping("/page")
    public Page<Favorite> findPage(@RequestParam Integer pageNum,
                                   @RequestParam Integer pageSize) {
        return favoriteService.page(new Page<>(pageNum, pageSize));
    }

    @GetMapping("/isFav")
    public Integer isFav(@RequestParam Integer uid, @RequestParam Integer spotId) {
        return favoriteService.isFav(uid, spotId);
    }

}

