package com.lhn.travel.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lhn.travel.common.Recommender.MyItemBasedRecommender;
import com.lhn.travel.entity.Spot;
import com.lhn.travel.service.ICommentService;
import com.lhn.travel.service.IFavoriteService;
import com.lhn.travel.service.ISpotService;
import com.lhn.travel.service.IUserService;
import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.recommender.GenericItemBasedRecommender;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/recommend")
public class RecommendController {

    @Resource
    private ICommentService commentService;

    @Resource
    private IUserService userService;

    @Resource
    private IFavoriteService favoriteService;

    @Resource
    private ISpotService spotService;


    @GetMapping("/get")
    public List<Spot> recommendByUser(@RequestParam Integer id, @RequestParam String type) {
        GenericItemBasedRecommender recommender = null;
        List<RecommendedItem> items = null;
        int spotNum = (int) spotService.count();
        try {
            recommender = MyItemBasedRecommender.getRecommend(commentService, userService, favoriteService, spotNum);
            if (type.equals("user")) {
                items = recommender.recommend(id, 4);
            } else if (type.equals("spot")) {
                items = recommender.mostSimilarItems(id, 4);
            }
        } catch (TasteException e) {
            e.printStackTrace();
        }
        ArrayList<Long> ids = new ArrayList<>();
        for (RecommendedItem item : items) {
            ids.add(item.getItemID());
        }
        QueryWrapper<Spot> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("is_deleted", 0);
        queryWrapper.in("spot_id", ids);
        return spotService.list(queryWrapper);
    }

}
