package com.lhn.travel.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * <p>
 *
 * </p>
 *
 * @author lhn
 * @since 2022-03-10
 */
@Getter
@Setter
@TableName("t_order" )
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "order_id", type = IdType.AUTO)
    private Integer orderId;

    private LocalDate orderUsetime;

    private LocalDateTime orderCreatetime;

    private BigDecimal orderTotal;

    private String orderStatus;

    private Integer spotId;

    private Integer userId;


}
