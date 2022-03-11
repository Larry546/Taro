package com.lhn.travel.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lhn.travel.entity.User;
import com.lhn.travel.service.IUserService;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author lhn
 * @since 2022-03-10
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private IUserService userService;

    @PostMapping("/save")
    public Boolean save(@RequestBody User user) {
        return userService.saveOrUpdate(user);
    }

    @DeleteMapping("/delete/{id}")
    public Boolean delete(@PathVariable Integer id) {
        return userService.removeById(id);
    }

    @GetMapping("/list")
    public List<User> findAll() {
        return userService.list();
    }

    @GetMapping("/find/{id}")
    public User findOne(@PathVariable Integer id) {
        return userService.getById(id);
    }

    @GetMapping("/page")
    public Page<User> findPage(@RequestParam Integer pageNum,
                               @RequestParam Integer pageSize) {
        return userService.page(new Page<>(pageNum, pageSize));
    }

    @PostMapping("/login")
    public Map login(@RequestBody User user) throws JSONException {
        Map map = new HashMap<>();

        String account = user.getUserAccount();
        String password = user.getUserPassword();

        Integer res = userService.veritypswd(account, password);
        if (res != null) {
            map.put("code", 1);
            map.put("msg", "登陆成功");
            map.put("uid", res);
        } else {
            map.put("code", 0);
            map.put("msg", "用户名或密码错误!");
        }
        return map;
    }
}

