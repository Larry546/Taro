package com.lhn.travel.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.lhn.travel.entity.Ticket;

import java.util.List;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author lhn
 * @since 2022-03-10
 */
public interface ITicketService extends IService<Ticket> {
    List findByOrder(Integer id);

    List<Ticket> findBySpot(Integer id);
}
