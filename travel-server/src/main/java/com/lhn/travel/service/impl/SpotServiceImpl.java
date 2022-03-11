package com.lhn.travel.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lhn.travel.entity.Spot;
import com.lhn.travel.mapper.SpotMapper;
import com.lhn.travel.service.ISpotService;
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
public class SpotServiceImpl extends ServiceImpl<SpotMapper, Spot> implements ISpotService {

    @Autowired
    SpotMapper spotMapper;

    public List<Spot> findByUser(Integer uid) {
        return spotMapper.findByUser(uid);
    }

    public List<Spot> findByType(String type) {
        return spotMapper.findByType(type);
    }

    public List<Spot> findByName(String kw) {
//        String keyword = "%" + kw + "%;
        return spotMapper.findByName(kw);
    }
}
