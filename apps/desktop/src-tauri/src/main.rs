#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu, SystemTrayMenuItem, SystemTrayEvent, Manager};

fn main() {
    let show = CustomMenuItem::new("show".to_string(), "Show");
    let about = CustomMenuItem::new("about".to_string(), "About Chronosphere");
    let settings = CustomMenuItem::new("settings".to_string(), "Settings");
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let tray_menu = SystemTrayMenu::new()
    .add_item(show)
    .add_item(about)
    .add_item(settings)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(quit);

    let tray = SystemTray::new().with_menu(tray_menu);
    

    tauri::Builder::default()
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick { .. } => {
              let main = app.get_window("main").unwrap();
              if main.is_visible().unwrap() {
                main.hide().unwrap();
              } else {
                main.show().unwrap();
                main.unminimize().unwrap();
                main.set_focus().unwrap();
              }
            }
            SystemTrayEvent::MenuItemClick { id, .. } => {
              match id.as_str() {
                "show" => {
                  let main = app.get_window("main").unwrap();
                  if main.is_visible().unwrap() {
                    main.hide().unwrap();
                  } else {
                    main.show().unwrap();
                    main.unminimize().unwrap();
                    main.set_focus().unwrap();
                  }
                }
                "quit" => {
                  app.exit(0);
                }
                _ => {}
              }
            }
            _ => {}
          })
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|_app_handle, event| match event {
            tauri::RunEvent::ExitRequested { api, .. } => {
                api.prevent_exit();
            }
            _ => {}
        });
}
