use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub enum SessionType {
    Focus,
    Break,
    LongBreak,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct TimerState {
    pub is_running: bool,
    pub session_type: SessionType,
}

#[derive(Deserialize)]
pub struct TimerStateForUpdate {
    pub is_running: Option<bool>,
    pub session_type: Option<SessionType>,
}

impl Default for TimerState {
    fn default() -> Self {
        Self {
            is_running: false,
            session_type: SessionType::Focus,
        }
    }
}

pub struct AppState {
    pub timer: TimerState,
}
