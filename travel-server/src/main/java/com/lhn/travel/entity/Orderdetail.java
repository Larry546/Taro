package com.lhn.travel.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

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
@TableName("t_orderdetail" )
public class Orderdetail implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "orderdetail_id", type = IdType.AUTO)
    private Integer orderdetailId;

    private Integer orderId;

    private Integer passengerId;

    private Integer ticketId;


}
