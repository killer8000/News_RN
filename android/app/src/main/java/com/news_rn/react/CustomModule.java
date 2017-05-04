package com.news_rn.react;

import android.app.DownloadManager;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.news_rn.listener.StatusBarColorManager;
import android.util.Log;
/**
 * Created by ndh on 17/1/19.
 */

public class CustomModule extends ReactContextBaseJavaModule {
    private static final String TITLE_MODULE = "TitleBarModule";

    public CustomModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return TITLE_MODULE;
    }

    @ReactMethod
    public void setTitleColor(String colorStr, Callback callback) {
        StatusBarColorManager.getInstance().post(colorStr);
        callback.invoke("success");
    }
}

