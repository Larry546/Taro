package com.lhn.travel.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lhn.travel.entity.Comment;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author lhn
 * @since 2022-03-10
 */
@Mapper
public interface CommentMapper extends BaseMapper<Comment> {

    Map getrateBySpot(Integer id);
}
