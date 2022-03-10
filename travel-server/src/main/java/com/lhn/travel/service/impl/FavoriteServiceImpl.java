package com.lhn.travel.service.impl;

import com.lhn.travel.entity.Favorite;
import com.lhn.travel.mapper.FavoriteMapper;
import com.lhn.travel.service.IFavoriteService;
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
public class FavoriteServiceImpl extends ServiceImpl<FavoriteMapper, Favorite> implements IFavoriteService {

}
