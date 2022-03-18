package com.lhn.travel.controller;

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
        return userService.removeById(id);
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

        Integer res = userService.veritypswd(account, password);
        if (res != null) {
            String token = userService.createToken(res);
            map.put("code", 1);
            map.put("msg", "登陆成功");
            map.put("uid", res);
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

    @GetMapping("/findByToken/{token}")
    public User findByToken(@PathVariable String token) {
        User user = userService.findByToken(token);
        return user;
    }

    @PostMapping("/register")
    public Boolean register(@RequestBody User user) {
        return userService.register(user);
    }
}

