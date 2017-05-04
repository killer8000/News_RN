package com.news_rn.listener;

/**
 * Created by ndh on 17/1/19.
 */

public class StatusBarColorManager {

    private StatusBarColorManager() {
    }

    public static StatusBarColorManager getInstance() {
        return StatusBarColorManager.SingleTone.instance;
    }

    private static class SingleTone {
        public static final StatusBarColorManager instance = new StatusBarColorManager();
    }

    public interface IstatusBarColorChange {
        void change(String colorStr);
    }

    private IstatusBarColorChange mListener;

    public void register(IstatusBarColorChange listener) {
        mListener = listener;
    }

    public void post(String colorStr) {
        if (mListener != null) {
            mListener.change(colorStr);
        }
    }
}
