use std::sync::{Mutex};

use tauri::{command, AppHandle, Wry};

use crate::{
    ctx::Ctx,
    state::{AppState, SessionType, TimerStateForUpdate},
};

#[command]
pub async fn update_timer_state(
    data: TimerStateForUpdate,
    app: AppHandle<Wry>,
    state: tauri::State<'_, Mutex<AppState>>,
) -> Result<(), ()> {
    let mut state = state.lock().unwrap();

    if let Some(session_type) = data.session_type {
        state.timer.session_type = session_type;
    }
    if let Some(is_running) = data.is_running {
        state.timer.is_running = is_running;
    }

    Ok(())
}