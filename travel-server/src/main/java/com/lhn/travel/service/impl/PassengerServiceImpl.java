package com.lhn.travel.service.impl;

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

    public List<Passenger> findByUser(Integer id) {
        return passengerMapper.findByUser(id);
    }
}
