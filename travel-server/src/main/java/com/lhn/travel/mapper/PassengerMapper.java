package com.lhn.travel.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lhn.travel.entity.Passenger;
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
public interface PassengerMapper extends BaseMapper<Passenger> {

    List findByOrder(Integer id);
}
