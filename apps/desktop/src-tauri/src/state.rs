pub enum SessionType {
    Focus,
    Break,
    LongBreak,
}

pub struct TimerState {
    pub is_running: bool,
    pub session_type: SessionType,
    pub session_time: u32,
    pub remaining_time: u32,
}

impl Default for TimerState {
    fn default() -> Self {
        Self {
            is_running: false,
            session_type: SessionType::Focus,
            session_time: 1_500_000,
            remaining_time: 1_500_000,
        }
    }
}

pub struct AppState {
    pub timer: TimerState,
}
