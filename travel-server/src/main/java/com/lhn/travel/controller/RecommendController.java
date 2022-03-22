package com.lhn.travel.controller;

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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
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


    @GetMapping("/user/{uid}")
    public List<Spot> recommendByUser(@PathVariable Integer uid) {
        GenericItemBasedRecommender recommender = null;
        List<RecommendedItem> items = null;
        try {
            recommender = MyItemBasedRecommender.getRecommend(commentService, userService, favoriteService);
            items = recommender.recommend(uid, 4);
        } catch (TasteException e) {
            e.printStackTrace();
        }
        ArrayList<Long> ids = new ArrayList<>();
        for (RecommendedItem item : items) {
            ids.add(item.getItemID());
        }
        return spotService.listByIds(ids);
    }

    @GetMapping("/spot/{spotId}")
    public List<Spot> recommendBySpot(@PathVariable Integer spotId) {
        GenericItemBasedRecommender recommender = null;
        List<RecommendedItem> items = null;
        try {
            recommender = MyItemBasedRecommender.getRecommend(commentService, userService, favoriteService);
            items = recommender.mostSimilarItems(spotId, 4);
        } catch (TasteException e) {
            e.printStackTrace();
        }
        ArrayList<Long> ids = new ArrayList<>();
        for (RecommendedItem item : items) {
            ids.add(item.getItemID());
        }
        return spotService.listByIds(ids);
    }
}
