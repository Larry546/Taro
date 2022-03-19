package com.lhn.travel.common.interceptor;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lhn.travel.common.utils.HttpContextUtil;
import com.lhn.travel.common.utils.Result;
import com.lhn.travel.entity.User;
import com.lhn.travel.service.IUserService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;

public class LoginInterceptor implements HandlerInterceptor {

    @Autowired
    private IUserService userService;

    private static void setReturn(HttpServletResponse response, int status, String msg) throws IOException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
        httpResponse.setHeader("Access-Control-Allow-Origin", HttpContextUtil.getOrigin());
        httpResponse.setCharacterEncoding("UTF-8");
        httpResponse.setStatus(401);
        response.setContentType("application/json;charset=utf-8");
        Result build = Result.build(status, msg);
        String json = JSON.toJSONString(build);
        httpResponse.getWriter().print(json);
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("token");
        if (StringUtils.isBlank(token)) {
            setReturn(response, 401, "用户未登录，请先登录");
            return false;
        }
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("token", token);
        User user = userService.getOne(queryWrapper);
        // 若用户不存在,
        if (user == null) {
            setReturn(response, 401, "用户不存在");
            return false;
        }
        // token失效
        if (user.getExpireTime().isBefore(LocalDateTime.now())) {
            setReturn(response, 401, "用户登录凭证已失效，请重新登录");
            return false;
        }
        return true;
    }
}
