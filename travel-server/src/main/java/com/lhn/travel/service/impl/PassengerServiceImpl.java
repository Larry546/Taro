package com.lhn.travel.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lhn.travel.entity.Passenger;
import com.lhn.travel.mapper.PassengerMapper;
import com.lhn.travel.service.IPassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author lhn
 * @since 2022-03-10
 */
@Service
public class PassengerServiceImpl extends ServiceImpl<PassengerMapper, Passenger> implements IPassengerService {

    @Autowired
    PassengerMapper passengerMapper;


    public Boolean delete(Integer id) {
        Passenger passenger = new Passenger();
        passenger.setIsDeleted(1);
        QueryWrapper<Passenger> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("passenger_id", id);
        int count = passengerMapper.update(passenger, queryWrapper);
        return count == 1 ? true : false;
    }

    public List findByOrder(Integer id) {
        return passengerMapper.findByOrder(id);
    }
}
