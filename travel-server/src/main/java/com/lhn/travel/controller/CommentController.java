package com.lhn.travel.controller;

import com.lhn.travel.entity.Comment;
import com.lhn.travel.service.ICommentService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author lhn
 * @since 2022-03-10
 */
@RestController
@RequestMapping("/comment")
public class CommentController {

    @Resource
    private ICommentService commentService;

    @PostMapping("/save")
    public Boolean save(@RequestBody Comment comment) {
        return commentService.saveOrUpdate(comment);
    }

    @DeleteMapping("/delete/{id}")
    public Boolean delete(@PathVariable Integer id) {
        return commentService.removeById(id);
    }

    @GetMapping("/list")
    public List<Comment> findAll() {
        return commentService.list();
    }

    @GetMapping("/find/{id}")
    public List<Comment> findOne(@PathVariable Integer id) {
        return commentService.list();
    }


    @GetMapping("/rateBySpot/{id}")
    public Map getrateBySpot(@PathVariable Integer id) {
        return commentService.getrateBySpot(id);
    }


}

