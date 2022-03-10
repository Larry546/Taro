package com.lhn.travel.service.impl;

import com.lhn.travel.entity.Comment;
import com.lhn.travel.mapper.CommentMapper;
import com.lhn.travel.service.ICommentService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author lhn
 * @since 2022-03-10
 */
@Service
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements ICommentService {

}
