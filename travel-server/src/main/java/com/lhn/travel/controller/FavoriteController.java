package com.lhn.travel.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
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


    @GetMapping("/isFav")
    public Integer isFav(@RequestParam Integer uid, @RequestParam Integer spotId) {
        QueryWrapper<Favorite> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", uid);
        queryWrapper.eq("spot_id", spotId);
        Favorite favorite = favoriteService.getOne(queryWrapper);
        return favorite == null ? 0 : favorite.getFavoriteId();
    }

}

