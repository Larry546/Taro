package com.lhn.travel.config;

import com.lhn.travel.common.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public LoginInterceptor loginInterceptor() {
        return new LoginInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        List<String> patterns = new ArrayList<>();
        patterns.add("/user/login/**");
        patterns.add("/user/logout/**");
        patterns.add("/user/register/**");
        patterns.add("/spot/find/**");
        patterns.add("/spot/list/**");
        patterns.add("/ticket/listBySpot/**");
        patterns.add("/comment/rateBySpot/**");
        patterns.add("/favorite/isFav/**");
        patterns.add("/spot/listByType/**");
        patterns.add("/spot/listByName/**");
        patterns.add("/spot/listByUser/**");

        registry.addInterceptor(loginInterceptor()).addPathPatterns("/**").excludePathPatterns(patterns);
    }
}
