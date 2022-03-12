package com.lhn.travel.service.impl;

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
        return userMapper.verifypswd(account, password);
    }

    public User getById(Integer id) {
        return userMapper.getById(id);
    }

    public String createToken(Integer uid) {
        // 用UUID生成token
        String token = UUID.randomUUID().toString();
        // 当前时间
        LocalDateTime now = LocalDateTime.now();
        // 过期时间 12个小时
        LocalDateTime expireTime = now.plusHours(12);
        // 保存到数据库
        userMapper.createToken(uid, token, now, expireTime);
        return token;
    }

}
