package com.lhn.travel.common.Recommender;

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

    public static GenericItemBasedRecommender getRecommend(ICommentService commentService, IUserService userService, IFavoriteService favoriteService) throws TasteException {

        FastByIDMap<PreferenceArray> preferenceArray = new FastByIDMap<>();

        List<User> userlist = userService.list();
        // 获取每个用户对景点的评价
        for (int i = 0; i < userlist.size(); i++) {
            Integer userId = userlist.get(i).getUserId();
            List<Rate> rates = commentService.getUserRate(userId);
            PreferenceArray preferences = new GenericUserPreferenceArray(rates.size());
            preferences.setUserID(i, userId);
            for (int j = 0; j < rates.size(); j++) {
                Integer spotId = rates.get(j).getSpotId();
                Integer isFav = favoriteService.isFav(userId, spotId);
                Float pref = rates.get(j).getAVGRate();
                if (isFav != 0) {
                    pref += 5;
                }
                pref /= 10;
                preferences.setItemID(j, spotId);
                preferences.setValue(j, pref);
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
