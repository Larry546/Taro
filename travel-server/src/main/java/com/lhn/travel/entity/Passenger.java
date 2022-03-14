package com.lhn.travel.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

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
@TableName("t_passenger")
public class Passenger implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "passenger_id", type = IdType.AUTO)
    private Integer passengerId;

    private String passengerName;

    private String passengerNumber;

    private String passengerSex;

    private LocalDate passengerBirth;

    private Integer userId;

    private Integer isDeleted;


}
