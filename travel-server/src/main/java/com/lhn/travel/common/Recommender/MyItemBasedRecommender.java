package com.lhn.travel.common.Recommender;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lhn.travel.entity.Favorite;
import com.lhn.travel.entity.Rate;
import com.lhn.travel.entity.User;
import com.lhn.travel.service.ICommentService;
import com.lhn.travel.service.IFavoriteService;
import com.lhn.travel.service.IUserService;
import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.common.FastByIDMap;
import org.apache.mahout.cf.taste.impl.model.GenericDataModel;
import org.apache.mahout.cf.taste.impl.model.GenericUserPreferenceArray;
import org.apache.mahout.cf.taste.impl.recommender.GenericItemBasedRecommender;
import org.apache.mahout.cf.taste.impl.similarity.PearsonCorrelationSimilarity;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.model.PreferenceArray;
import org.apache.mahout.cf.taste.similarity.ItemSimilarity;

import java.util.List;

public class MyItemBasedRecommender {

    public static GenericItemBasedRecommender getRecommend(ICommentService commentService, IUserService userService, IFavoriteService favoriteService, int spotNum) throws TasteException {

        FastByIDMap<PreferenceArray> preferenceArray = new FastByIDMap<>();

        List<User> userlist = userService.list();
        // 获取每个用户对景点的评价
        for (int i = 0; i < userlist.size(); i++) {
            Integer userId = userlist.get(i).getUserId();
            PreferenceArray preferences = new GenericUserPreferenceArray(spotNum + 1);
            // 处理评价列表
            List<Rate> rates = commentService.getUserRate(userId);
            preferences.setUserID(i, userId);
            for (Rate rate : rates) {
                Integer spotId = rate.getSpotId();
                Float pref = rate.getAVGRate();
                pref /= 10;
                preferences.setItemID(spotId, spotId);
                preferences.setValue(spotId, pref);
            }
            // 处理收藏列表
            QueryWrapper<Favorite> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("user_id", userId);
            List<Favorite> favorites = favoriteService.list(queryWrapper);
            for (Favorite favorite : favorites) {
                Integer spotId = favorite.getSpotId();
                Float pref = preferences.getValue(spotId);
                pref += 0.5f;
                preferences.setItemID(spotId, spotId);
                preferences.setValue(spotId, pref);
            }
            preferenceArray.put(userId, preferences);
        }

        // 构建DataModel
        DataModel dataModel = new GenericDataModel(preferenceArray);
        // 根据DataModel生成相似矩阵
        ItemSimilarity similarity = new PearsonCorrelationSimilarity(dataModel);
        // 获取近邻（只用于UserCF）
        // UserNeighborhood neighborhood = new NearestNUserNeighborhood(2, similarity, dataModel);
        // 生成推荐
        GenericItemBasedRecommender recommender = new GenericItemBasedRecommender(dataModel, similarity);

        return recommender;
    }
}
