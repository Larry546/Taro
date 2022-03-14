package com.lhn.travel.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lhn.travel.entity.Order;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author lhn
 * @since 2022-03-10
 */
@Mapper
public interface OrderMapper extends BaseMapper<Order> {
    List findByUser(Integer id, String type);

    int deleteOrder(Integer id);
}
