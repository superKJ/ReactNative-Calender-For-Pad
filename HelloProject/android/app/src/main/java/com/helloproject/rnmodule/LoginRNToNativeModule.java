package com.helloproject.rnmodule;

import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by XG on 2017/10/31.
 * author by liuchao
 */

public class LoginRNToNativeModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext reactContext;

    public LoginRNToNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "LoginRNToNativeModule";
    }

    @ReactMethod
    public void HandleMessage(String aMessage) {
        try {
            Log.d("tiyu", "login aMessage=" + aMessage);
            String[] msgs = aMessage.split("@");
            String tag = msgs[0];
            String json = msgs[1].replace("\\", "");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }

    @ReactMethod
    public void HandleMessageError(String aMessage) {
        try {
            if (aMessage != null) {
                Toast.makeText(getReactApplicationContext(), aMessage, Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(getReactApplicationContext(), "登录失败请尝试重新登录", Toast.LENGTH_SHORT).show();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }

    @ReactMethod
    public void HandleMessageLog(String aMessage) {
        Log.d("tiyu", "HandleMessageError=" + aMessage);
    }
}