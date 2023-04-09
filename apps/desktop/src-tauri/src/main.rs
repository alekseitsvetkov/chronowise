#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod config;
mod ctx;
mod ipc;
mod prelude;
mod setup;
mod state;
mod utils;

use crate::ipc::*;
use crate::prelude::*;
use setup::init_setup;
use std::env;
use std::io::BufReader;
use tauri::{
  CustomMenuItem, Manager, RunEvent, SystemTray, SystemTrayEvent, SystemTrayMenu,
  SystemTrayMenuItem, WindowEvent,
};
use tokio::runtime::Builder;
use tauri_plugin_log::LogTarget;

#[derive(Clone, serde::Serialize)]
struct Payload {
  args: Vec<String>,
  cwd: String,
}

#[tauri::command(async)]
async fn app_ready(app_handle: tauri::AppHandle) {
	let window = app_handle.get_window("main").unwrap();

	window.show().unwrap();
}

#[tauri::command]
async fn play_notification_sound(app_handle: tauri::AppHandle) {
  let resource_path = app_handle
      .path_resolver()
      .resolve_resource("../assets/audio/notification.mp3")
      .expect("failed to resolve resource dir");

  let (_stream, handle) = rodio::OutputStream::try_default().unwrap();
  let sink = rodio::Sink::try_new(&handle).unwrap();

  let file = std::fs::File::open(&resource_path).unwrap();
  sink.append(rodio::Decoder::new(BufReader::new(file)).unwrap());
  sink.sleep_until_end();
}

fn main() {
  let runtime = Builder::new_current_thread()
      .build()
      .expect("expected tokio runtime");

  tauri::Builder::default()
      .setup(move |app| Ok(runtime.block_on(init_setup(app))))
      .system_tray(create_system_tray())
      .on_system_tray_event(|app, event| match event {
          SystemTrayEvent::LeftClick { .. } => {
              let window = app.get_window("main").unwrap();
              let visible = window.is_visible().unwrap();
              if visible {
                  window.hide().unwrap();
              } else {
                  window.show().unwrap();
                  window.set_focus().unwrap();
              }
          }
          SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
              "Hide" => {
                  let window = app.get_window("main").unwrap();
                  window.hide().unwrap();
              }
              "Show" => {
                  let window = app.get_window("main").unwrap();
                  window.show().unwrap();
                  window.center().unwrap();
              }
              "Quit" => {
                  std::process::exit(0);
              }
              _ => {}
          },
          _ => {}
      })
      .invoke_handler(tauri::generate_handler![
        app_ready,
        // update_timer_state,
        play_notification_sound,
        // get_sessions,
        // create_session
      ])
      .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
          println!("{}, {argv:?}, {cwd}", app.package_info().name);

          app.emit_all("single-instance", Payload { args: argv, cwd })
              .unwrap();
      }))
      .plugin(
          tauri_plugin_log::Builder::default()
              .targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
              .build(),
      )
      .build(tauri::generate_context!())
      .expect("error while running tauri application")
      .run(|app, event| match event {
          RunEvent::WindowEvent { label, event, .. } => match event {
              WindowEvent::CloseRequested { api, .. } => {
                  let window = app.get_window(label.as_str()).unwrap();
                  window.hide().unwrap();
                  api.prevent_close();
              }
              _ => {}
          },
          _ => {}
      });
}

fn create_system_tray() -> SystemTray {
  let quit = CustomMenuItem::new("Quit".to_string(), "Quit");
  let show = CustomMenuItem::new("Show".to_string(), "Show");
  let hide = CustomMenuItem::new("Hide".to_string(), "Hide");
  let tray_menu = SystemTrayMenu::new()
      .add_item(show)
      .add_item(hide)
      .add_native_item(SystemTrayMenuItem::Separator)
      .add_item(quit);
  SystemTray::new().with_menu(tray_menu)
}