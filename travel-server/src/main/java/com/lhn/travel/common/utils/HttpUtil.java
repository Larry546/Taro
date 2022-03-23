package com.lhn.travel.common.utils;

import com.alibaba.fastjson.JSON;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import java.io.IOException;
import java.util.Map;

public class HttpUtil {

    public static HttpEntity doGet(String url) {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet(url);
        HttpEntity res = null;
        try {
            CloseableHttpResponse response = httpClient.execute(httpGet);
            res = response.getEntity();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return res;
    }

    public static HttpEntity doPost(String url, Map data) {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(url);
        HttpEntity res = null;
        try {
            httpPost.setEntity(new StringEntity(JSON.toJSONString(data)));
            CloseableHttpResponse response = httpClient.execute(httpPost);
            res = response.getEntity();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return res;
    }
}
