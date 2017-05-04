package com.news_rn;

import android.annotation.TargetApi;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;

import com.facebook.react.ReactActivity;
import io.realm.react.RealmReactPackage;
import com.news_rn.listener.StatusBarColorManager;

import okhttp3.MediaType;

public class MainActivity extends ReactActivity {
    private static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        StatusBarColorManager.getInstance().register(new StatusBarColorManager.IstatusBarColorChange() {
            @TargetApi(Build.VERSION_CODES.LOLLIPOP)
            @Override
            public void change(String colorStr) {
                try {
                    getWindow().setStatusBarColor(Color.parseColor(colorStr));
                } catch (Exception e) {
                    // 转换异常
                    Log.e(TAG, e.toString());
                }
            }
        });
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    @Override
    protected String getMainComponentName() {
        return "News_RN";
    }
    public void test(){

    }

}
