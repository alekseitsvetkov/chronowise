use std::{fs, path::Path};

use crate::{prelude::*, utils};
use serde::{Deserialize, Serialize};
use serde_with_macros::skip_serializing_none;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct TimerConfig {
    pub focus_duration: Minutes,
    pub break_duration: Minutes,
    pub long_break_duration: Minutes,
    pub long_break_interval: i64,
    pub auto_start_focus: bool,
    pub auto_start_break: bool,
}

impl Default for TimerConfig {
    fn default() -> Self {
        Self {
            focus_duration: 25,
            break_duration: 5,
            long_break_duration: 15,
            long_break_interval: 4,
            auto_start_focus: false,
            auto_start_break: false,
        }
    }
}

#[skip_serializing_none]
#[derive(Deserialize, Debug)]
pub struct TimerConfigForUpdate {
    pub focus_duration: Option<Minutes>,
    pub break_duration: Option<Minutes>,
    pub long_break_duration: Option<Minutes>,
    pub long_break_interval: Option<i64>,
    pub auto_start_focus: Option<bool>,
    pub auto_start_break: Option<bool>,
}

pub struct TimerCfg;

impl TimerCfg {
    pub fn setup() {
        let path = Self::get_path();

        if !Path::new(&path).is_file() {
            let config = TimerConfig::default();
            Self::save(&config);
        }
    }

    pub fn get() -> TimerConfig {
        let path = Self::get_path();
        let contents = fs::read_to_string(path).unwrap();

        match serde_json::from_str(&contents) {
            Ok(config) => config,
            Err(_) => {
                let config = TimerConfig::default();

                Self::save(&config);

                config
            }
        }
    }

    pub fn save(config: &TimerConfig) {
        let path = Self::get_path();
        let content = serde_json::to_string_pretty(config).unwrap();

        fs::write(path, content).unwrap();
    }

    pub fn update(config: &TimerConfigForUpdate) {
        let mut current_config = Self::get();

        if let Some(focus_duration) = config.focus_duration {
            current_config.focus_duration = focus_duration;
        }

        if let Some(break_duration) = config.break_duration {
            current_config.break_duration = break_duration;
        }

        if let Some(long_break_duration) = config.long_break_duration {
            current_config.long_break_duration = long_break_duration;
        }

        if let Some(long_break_interval) = config.long_break_interval {
            current_config.long_break_interval = long_break_interval;
        }

        if let Some(auto_start_focus) = config.auto_start_focus {
            current_config.auto_start_focus = auto_start_focus;
        }

        if let Some(auto_start_break) = config.auto_start_break {
            current_config.auto_start_break = auto_start_break;
        }

        Self::save(&current_config);
    }

    fn get_path() -> String {
        utils::get_config_path() + "./timer.json"
    }
}
