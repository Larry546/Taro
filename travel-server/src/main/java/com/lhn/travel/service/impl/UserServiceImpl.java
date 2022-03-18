package com.lhn.travel.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lhn.travel.entity.User;
import com.lhn.travel.mapper.UserMapper;
import com.lhn.travel.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author lhn
 * @since 2022-03-10
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

    @Autowired
    UserMapper userMapper;

    public Integer veritypswd(String account, String password) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_account", account);
        queryWrapper.eq("user_password", password);
        User user = userMapper.selectOne(queryWrapper);
        return user.getUserId();
    }

    public User getByBaseId(Integer id) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", id);
        User user = userMapper.selectById(id);
        User resUser = new User();
        resUser.setUserId(user.getUserId());
        resUser.setUserAccount(user.getUserAccount());
        resUser.setUserContact(user.getUserContact());
        resUser.setUserNickname(user.getUserNickname());
        return resUser;
    }

    public String createToken(Integer uid) {
        // 用UUID生成token
        String token = UUID.randomUUID().toString();
        // 当前时间
        LocalDateTime now = LocalDateTime.now();
        // 过期时间 12个小时
        LocalDateTime expireTime = now.plusHours(12);
        // 保存到数据库
        User user = new User();
        user.setToken(token);
        user.setExpireTime(expireTime);
        user.setLoginTime(now);
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", uid);
        userMapper.update(user, queryWrapper);
        return token;
    }

    public void logout(String token) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("token", token);
        User user = new User();
        user.setToken(UUID.randomUUID().toString());
        user.setExpireTime(LocalDateTime.now());
        user.setLoginTime(LocalDateTime.now());
        userMapper.update(user, queryWrapper);
    }

    public User findByToken(String token) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("token", token);
        return userMapper.selectOne(queryWrapper);
    }

    public Boolean register(User user) {
        String account = user.getUserAccount();
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_account", account);
        User user1 = userMapper.selectOne(queryWrapper);
        if (user1 != null) {
            return false;
        } else if (user.getUserPassword() == null || user.getUserPassword().equals("")) {
            return false;
        } else {
            int count = userMapper.insert(user);
            return count == 1 ? true : false;
        }

    }

}
