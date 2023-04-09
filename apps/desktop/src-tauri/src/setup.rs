use std::{fs, path::Path, sync::Mutex};

use tauri::{App, AppHandle, Manager};

use window_shadows::set_shadow;

use crate::{
  config::{TimerCfg},
  utils,
  state::{AppState, TimerState},
  ctx::Ctx,
};

pub async fn init_setup(app: &mut App) {
  setup_config_dir();

  TimerCfg::setup();

  setup_main_window(&app.app_handle());
}

fn setup_config_dir() {
  let path = utils::get_config_path();

  if !Path::new(&path).is_dir() {
    fs::create_dir(path).unwrap();
  }
}

async fn setup_state(app: &mut App) {
  let timer = TimerState::default();

  if let Ok(ctx) = Ctx::from_app(app.app_handle()) {

    let app_state = AppState {
      timer,
    };

    app.manage(Mutex::new(app_state));
  }
}

fn setup_main_window(app: &AppHandle) -> tauri::Result<()> {
  let window = app.get_window("main").unwrap();
          
  #[cfg(debug_assertions)]
  {
    let window = app.get_window("main").unwrap();
    window.open_devtools();
    window.close_devtools();
  }

  #[cfg(target_os = "windows")]
  window.set_decorations(false).unwrap();

  #[cfg(any(windows, target_os = "macos"))]
  set_shadow(&window, true).unwrap();

  #[cfg(target_os = "macos")]
  window.set_transparent_titlebar(true, false);

  Ok(())
}


