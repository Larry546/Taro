package com.lhn.travel.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lhn.travel.entity.Order;
import com.lhn.travel.mapper.OrderMapper;
import com.lhn.travel.service.IOrderService;
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
public class OrderServiceImpl extends ServiceImpl<OrderMapper, Order> implements IOrderService {

    @Autowired
    OrderMapper orderMapper;

    public List findByUser(Integer uid, Integer type) {
        String ctype = "";
        switch (type) {
            case 1:
                ctype = "待支付";
                break;
            case 2:
                ctype = "未使用使用";
                break;
            case 3:
                ctype = "待评价";
                break;
            default:
                ctype = "";
        }
        return orderMapper.findByUser(uid, ctype);
    }

    public Boolean delete(Integer id) {
        Order order = new Order();
        order.setIsDeleted(1);
        QueryWrapper<Order> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("order_id", id);
        int count = orderMapper.update(order, queryWrapper);
        return count == 1 ? true : false;
    }

    public Integer saveOrder(Order order) {
        Integer count = orderMapper.insertOrder(order);
        if (count > 0) {
            return order.getOrderId();
        } else {
            return 0;
        }
    }
}
