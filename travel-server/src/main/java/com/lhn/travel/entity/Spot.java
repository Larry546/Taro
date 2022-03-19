package com.lhn.travel.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalTime;

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
@TableName("t_spot")
public class Spot implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "spot_id", type = IdType.AUTO)
    private Integer spotId;

    private String spotName;

    private String spotAddress;

    private LocalTime spotOpenhour;

    private LocalTime spotOffhour;

    private String spotImageurl;

    private String spotType;

    private String spotIntro;

    private Integer isDeleted;


}
