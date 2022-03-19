package com.lhn.travel.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

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
@TableName("t_ticket")
public class Ticket implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "ticket_id", type = IdType.AUTO)
    private Integer ticketId;

    private String ticketName;

    private BigDecimal ticketPrice;

    private String ticketRequest;

    private String ticketTag;

    private Integer spotId;

    private Integer isDeleted;


}
