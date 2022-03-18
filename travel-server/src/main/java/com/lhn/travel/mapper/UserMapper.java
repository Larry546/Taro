package com.lhn.travel.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lhn.travel.entity.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author lhn
 * @since 2022-03-10
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

}
