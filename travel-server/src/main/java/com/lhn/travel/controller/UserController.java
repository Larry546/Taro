package com.lhn.travel.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.lhn.travel.entity.User;
import com.lhn.travel.service.IUserService;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
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
        UpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("user_id", id);
        updateWrapper.set("is_deleted", 1);
        return userService.update(updateWrapper);
    }

    @DeleteMapping("/undelete/{id}")
    public Boolean undelete(@PathVariable Integer id) {
        UpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("user_id", id);
        updateWrapper.set("is_deleted", 0);
        return userService.update(updateWrapper);
    }

    @GetMapping("/list")
    public List<User> findAll() {
        return userService.list();
    }

    @GetMapping("/find/{id}")
    public User findOne(@PathVariable Integer id) {
        return userService.getByBaseId(id);
    }

    @GetMapping("/adminFind/{id}")
    public User adminFind(@PathVariable Integer id) {
        return userService.getById(id);
    }

    @PostMapping("/login")
    public Map login(@RequestBody User user) throws JSONException {
        Map map = new HashMap<>();

        String account = user.getUserAccount();
        String password = user.getUserPassword();

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_account", account);
        queryWrapper.eq("user_password", password);
        queryWrapper.eq("is_deleted", 0);
        User resUser = userService.getOne(queryWrapper);

        if (resUser != null) {
            Integer uid = resUser.getUserId();
            String token = userService.createToken(uid);
            map.put("code", 1);
            map.put("msg", "登陆成功");
            map.put("uid", uid);
            map.put("token", token);
        } else {
            map.put("code", 0);
            map.put("msg", "用户名或密码错误!");
        }
        return map;
    }

    @PostMapping("/logout")
    public Boolean logout(HttpServletRequest request) {
        String token = request.getHeader("token");
        userService.logout(token);
        return true;
    }


    @PostMapping("/register")
    public Boolean register(@RequestBody User user) {
        return userService.register(user);
    }
}

