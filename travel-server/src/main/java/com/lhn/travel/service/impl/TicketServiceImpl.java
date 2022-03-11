package com.lhn.travel.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lhn.travel.entity.Ticket;
import com.lhn.travel.mapper.TicketMapper;
import com.lhn.travel.service.ITicketService;
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
public class TicketServiceImpl extends ServiceImpl<TicketMapper, Ticket> implements ITicketService {

    @Autowired
    TicketMapper ticketMapper;

    public List findByOrder(Integer id) {
        return ticketMapper.findByOrder(id);
    }

    public List findBySpot(Integer id) {
        return ticketMapper.findBySpot(id);
    }
}
