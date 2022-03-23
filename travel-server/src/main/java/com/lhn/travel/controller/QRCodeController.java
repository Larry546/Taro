package com.lhn.travel.controller;

import com.alibaba.fastjson.JSONObject;
import com.lhn.travel.common.utils.HttpUtil;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.util.EntityUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/qrcode")
public class QRCodeController {

    public static String getAccessToken() {
        String token = null;
        try {
            String requestUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx4c82f3df604948b2&secret=847d2f42bff1833cf350e7cbcb34f6f8";
            HttpEntity entity = HttpUtil.doGet(requestUrl);
            String result = EntityUtils.toString(entity);
            JSONObject jsonObject = JSONObject.parseObject(result);
            token = jsonObject.getString("access_token");
        } catch (Exception e) {
            e.fillInStackTrace();
        }
        return token;
    }

    @GetMapping("/weapp/{spotId}")
    public String getWeApp(@PathVariable Integer spotId) {
        String token = getAccessToken();
        String res = null;
        if (token == null) {
            return null;
        }
        try {
            String requestUrl = "https://api.weixin.qq.com/wxa/getwxacode?access_token=" + token;
            String path = "path=pages/spot-detail/index?spotId=" + spotId;
            Map<String, Object> params = new HashMap<>();
            params.put("path", path);
            HttpEntity entity = HttpUtil.doPost(requestUrl, params);
            InputStream inputStream = entity.getContent();
            byte[] bytes = IOUtils.toByteArray(inputStream);
            res = "data:image/png;base64," + Base64.getEncoder().encodeToString(bytes);
        } catch (Exception e) {
            e.fillInStackTrace();
        }
        return res;
    }

    @GetMapping("/h5/{spotId}")
    public String getH5(@PathVariable Integer spotId) {
        String res = null;
        try {
            String url = "https://api.pwmqr.com/qrcode/create/?url=http%3A%2F%2Flocalhost%3A8086%2F%23%2Fpages%2Fspot-detail%2Findex%3FspotId%3D" + spotId + "&down=1";
            HttpEntity entity = HttpUtil.doGet(url);
            InputStream inputStream = entity.getContent();
            byte[] bytes = IOUtils.toByteArray(inputStream);
            res = "data:image/png;base64," + Base64.getEncoder().encodeToString(bytes);
        } catch (Exception e) {
            e.fillInStackTrace();
        }
        return res;
    }
}
