package com.lhn.travel.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.lhn.travel.entity.User;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author lhn
 * @since 2022-03-10
 */
public interface IUserService extends IService<User> {

    Integer veritypswd(String account, String password);

    User getByBaseId(Integer id);

    String createToken(Integer uid);

    void logout(String token);

    User findByToken(String token);

    Boolean register(User user);
}
